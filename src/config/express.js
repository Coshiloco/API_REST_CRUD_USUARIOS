import userRouter from "#Routes/user.routes.js";
import express from "express";

const expressApp = express();


// TODO : Añadir middlewarees, routes...

// Middlewares
expressApp.use(express.json());

// Routes
expressApp.use('/user', userRouter);

export default expressApp;