// Importamos las librerias instaladas para hacer las validaciones
import {Type} from '@sinclair/typebox';
// Validaciones
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const RegisterDTOSchema = Type.Object({
  _id:Type.String({
      format: 'uuid',
      errorMessage: {
        type: 'El tipo de _id no es valido, debe ser un string',
        format: 'El formato de _id no es valido, debe ser un uuid4'
      }
  }),
  name:Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: { minLength: 'El nombre debe tener al menos 2 caracteres',
    maxLength: 'El nombre debe de tener como máximo 20 caractéres de longitud'}
  }),
  surname:Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: { minLength: 'El apellido debe tener al menos 4 caracteres',
    maxLength: 'El apellido debe de tener como máximo 50 caractéres de longitud'}
  }),
  email:Type.String({
    format: 'email',
    errorMessage: {
      type: 'El tipo de email no es valido, debe ser un string',
      format: 'El formato de email no es valido, debe de cumplir el RFC 5322'
    }
  }),
  password:Type.String({
    format: 'password', 
    minLength: 10,
    maxLength: 25,
    errorMessage: {type: 'El tipo de la contraseña no es valido, debe ser un string',
    format: 'El formato de la contraseña no es valido, debe de contener una mayuscula, una minuscula y un numero',
    minLength: 'password debe tener al menos 10 caracteres',
    maxLength: 'password debe de tener como máximo 25 caractéres de longitud'}
  })
});

// Constantes de ajv para validar formatos
const ajv = new Ajv();
/** Para hacer validaciones custom como el de la contraseña  */
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email', 'uuid']).addKeyword('kind').addKeyword('modifier');
addErrors(ajv);
// COmpilando con ajv nos devuleve la funcion de validacion que poenemos en un middleware
const validateSchema = ajv.compile(RegisterDTOSchema);

const userRegisterDTO = (req,res,next) => {
  const isDTOValid = validateSchema(req.body)
  // Le pasamos lo que a metido el usuario para que nos lo valide
  
  if(!isDTOValid) return res.status(400)
  .send(ajv.errorsText(validateSchema.errors, { separator: '\n'}))
  
  next();

}

/** lo que le estamos diciendo es que los formayos de nuestros objetos 
de tipo Type se validen el campo del email por el email es decir el regex para email
y el uuid para el uuid es decir es como para la validacion extra 
porque el resto de campo excepto la contraseña le meteremos la validacion custom */

/** Para hacer validaciones custom como el de la contraseña  */

// Exportamos 

export default userRegisterDTO;