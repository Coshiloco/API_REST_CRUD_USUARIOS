// Esquemas de validacion archivo dto-type
import {
  nameDTOSchema,
  surnameDTOSchema
} from '#Lib/dto-types.js';
// Importamos las librerias instaladas para hacer las validaciones
import {Type} from '@sinclair/typebox';
// Validaciones
import Ajv from 'ajv';
import addErrors from 'ajv-errors';

const UpdateDataDTOSchema = Type.Object({
  name: nameDTOSchema,
  surname: surnameDTOSchema,
},{additionalProperties: false, errorMessage: 'EL formato no es valido has introducido campos extras'});

// Constantes de ajv para validar formatos
const ajv = new Ajv({ allErrors: true})
  .addKeyword('kind')
  .addKeyword('modifier'); // AllErrors para que podamos generar errores nuestros si pasa
addErrors(ajv);
// COmpilando con ajv nos devuleve la funcion de validacion que poenemos en un middleware
const validateSchema = ajv.compile(UpdateDataDTOSchema);

const userUpdatedataDTO = (req,res,next) => {
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

export default userUpdatedataDTO;