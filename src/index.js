

// Funcion de arranque que el llama bootstrap
import connectDB from '#Config/db.js';
import '#Config/env.js';
import httpServer from "#Config/htttp.js";

const bootstrap = async () => {

  // COnectamos a la base de datos previamente a levantar el servidor
  
  
  // Proemesa por tanto el await 
  
  
  await connectDB(process.env.MONGODB_URL);
  
  httpServer.listen(process.env.PORT, () => {
    console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
  })
};

bootstrap();
