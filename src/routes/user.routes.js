import userLoginController from '#Controllers/user-login.controller.js';
import userProfileController from '#Controllers/user-profile.controller.js';
import userRegisterController from '#Controllers/user-register.controller.js';
import userUpdateDataController from '#Controllers/user-update-data.controller.js';
import userJWTDTO from '#Dto/user-jwt.dto.js';
// import userJWTDTO from '#Dto/user-jwt.dto.js';
import userLoginDTO from '#Dto/user-login.dto.js';
import userRegisterDTO from '#Dto/user-register.dto.js';
import userUpdatedataDTO from '#Dto/user-update-data.dto.js';
// import userUnregisterDTO from '#Dto/user-unregister.dto..js';
// import userUpdatedataDTO from '#Dto/user-update-data.dto.js';
// import userUpdateEmailDTO from '#Dto/user-update-email.dto.js';
// import userUpdatePasswordDTO from '#Dto/user-update-password.dto.js';
import {Router} from 'express';

// A esto se los llama endpoints

// El router es decir todas la rutas asociadas a este usuario
const userRouter = Router();

// Registro del usuario con post 

userRouter.post('/register', userRegisterDTO,userRegisterController);

// El usuario logeo

userRouter.post('/login', userLoginDTO,userLoginController);

// Obtencion de los datos por parte del usuario

userRouter.get('/profile', userJWTDTO,userProfileController);

// Casos de actualizacion de datos por parte del usuario

// Caso de actualzacion del nombre y mas informacion

userRouter.patch('/update-data',userJWTDTO,userUpdatedataDTO,userUpdateDataController);

// Caso de actualizacion del email

// userRouter.patch('/update-email',userJWTDTO,userUpdateEmailDTO,userUpdateEmailController);

// Caso de actualizacion de la contraseña

// userRouter.patch('/update-password',userJWTDTO,userUpdatePasswordDTO,userUpdatePasswordController);

// Eliminacion de los datos del usuario en la plataforma 

// userRouter.delete('/unregister',userJWTDTO, userUnregisterDTO,userUnregisterController);

export default userRouter;
