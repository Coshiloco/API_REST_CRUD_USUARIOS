// Esquemas de validacion archivo dto-type
import {
  emailDTOSchema,
  passwordDTOSchema
} from '#Dto/dto-types.js';
// Importamos las librerias instaladas para hacer las validaciones
import {Type} from '@sinclair/typebox';
// Validaciones
import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import addErrors from 'ajv-errors';

const userUpdateEmailDTOSchema = Type.Object({
  email: emailDTOSchema,
  password: passwordDTOSchema
},{additionalProperties: false, errorMessage: 'EL formato no es valido has introducido campos extras'});

// Constantes de ajv para validar formatos
const ajv = new Ajv({ allErrors: true})
.addKeyword('kind')
.addKeyword('modifier'); // AllErrors para que podamos generar errores nuestros si pasa
/** Para hacer validaciones custom como el de la contraseña  */
ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ['email']);
addErrors(ajv);
// COmpilando con ajv nos devuleve la funcion de validacion que poenemos en un middleware
const validateSchema = ajv.compile(userUpdateEmailDTOSchema);

const userUpdateEmailDTO = (req,res,next) => {
  const isDTOValid = validateSchema(req.body)
  // Le pasamos lo que a metido el usuario para que nos lo valide
  
  if(!isDTOValid) return res.status(400)
  .send({
    errors: validateSchema.errors.map(error => error.message)
  })
  
  next();

}

/** lo que le estamos diciendo es que los formayos de nuestros objetos 
de tipo Type se validen el campo del email por el email es decir el regex para email
y el uuid para el uuid es decir es como para la validacion extra 
porque el resto de campo excepto la contraseña le meteremos la validacion custom */

/** Para hacer validaciones custom como el de la contraseña  */

// Exportamos 

export default userUpdateEmailDTO;