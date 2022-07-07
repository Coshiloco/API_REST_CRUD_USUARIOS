// Importamos las librerias instaladas para hacer las validaciones
import {Type} from '@sinclair/typebox';



export const idDTOSchema = Type.String({
  format: 'uuid',
  errorMessage: {
    type: 'El tipo de _id no es valido, debe ser un string',
    format: 'El formato de _id no es valido, debe ser un uuid4'
  }
});

export const nameDTOSchema = Type.String({
  minLength: 2,
  maxLength: 20,
  errorMessage: { minLength: 'El nombre debe tener al menos 2 caracteres',
  maxLength: 'El nombre debe de tener como máximo 20 caractéres de longitud'}
});

export const surnameDTOSchema = Type.String({
  minLength: 4,
  maxLength: 50,
  errorMessage: { minLength: 'El apellido debe tener al menos 4 caracteres',
  maxLength: 'El apellido debe de tener como máximo 50 caractéres de longitud'}
});

export const emailDTOSchema = Type.String({
  format: 'email',
  errorMessage: {
    type: 'El tipo de email no es valido, debe ser un string',
    format: 'El formato de email no es valido, debe de cumplir el RFC 5322'
  }
});

export const passwordDTOSchema = Type.String({
  format: 'password', 
  minLength: 10,
  maxLength: 25,
  errorMessage: {type: 'El tipo de la contraseña no es valido, debe ser un string',
  format: 'El formato de la contraseña no es valido, debe de contener una mayuscula, una minuscula y un numero',
  minLength: 'password debe tener al menos 10 caracteres',
  maxLength: 'password debe de tener como máximo 25 caractéres de longitud'
  }
});