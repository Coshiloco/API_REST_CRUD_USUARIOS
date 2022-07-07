import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import userUnregisterDTO from '#Dto/user-unregister.dto..js';
import userUpdatedataDTO from '#Dto/user-update-data.dto.js';
import userUpdateEmailDTO from '#Dto/user-update-email.dto.js';
import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js';
import {Router} from 'express';

// A esto se los llama endpoints

// El router es decir todas la rutas asociadas a este usuario
const userRouter = Router();

// Registro del usuario con post 

userRouter.post('/register', userRegisterDTO);

// El usuario logeo

userRouter.post('/login', userLoginDTO);

// Obtencion de los datos por parte del usuario

userRouter.get('/profile');

// Casos de actualizacion de datos por parte del usuario

// Caso de actualzacion del nombre y mas informacion

userRouter.patch('/update-data',userUpdatedataDTO);

// Caso de actualizacion del email

userRouter.patch('/update-email',userUpdateEmailDTO);

// Caso de actualizacion de la contraseña

userRouter.patch('/update-password',userUpdatePasswordDTO);

// Eliminacion de los datos del usuario en la plataforma 

userRouter.delete('/unregister', userUnregisterDTO);

export default userRouter;
