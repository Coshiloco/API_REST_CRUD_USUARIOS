import userRegisterDTO from '#Dto/user-register.dto.js';
import {Router} from 'express';

// A esto se los llama endpoints

// El router es decir todas la rutas asociadas a este usuario
const userRouter = Router();

// Registro del usuario con post 

userRouter.post('/register', userRegisterDTO, (req,res) => {
  res.send()
});

// El usuario logeo

userRouter.post('/login');

// Obtencion de los datos por parte del usuario

userRouter.get('/profile');

// Casos de actualizacion de datos por parte del usuario

// Caso de actualzacion del nombre y mas informacion

userRouter.patch('/update-data');

// Caso de actualizacion del email

userRouter.patch('/update-email');

// Caso de actualizacion de la contraseña

userRouter.patch('/update-password');

// Eliminacion de los datos del usuario en la plataforma 

userRouter.delete('/unregister');

export default userRouter;
