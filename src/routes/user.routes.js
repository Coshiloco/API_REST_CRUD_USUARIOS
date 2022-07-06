import {Router} from 'express';

// El router es decir todas la rutas asociadas a este usuario
const userRouter = Router();

// Registro del usuario con post 

userRouter.post('/register');

// EL logeo del usuario

userRouter.post('/login');

