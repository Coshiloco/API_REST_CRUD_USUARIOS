// Importamos la libreria 
import { jwtVerify } from "jose";

// Va a ser un middleware 
const userJWTDTO = async (req,res,next) => {
    const {authorization} = req.headers;
    
    if(!authorization) return res.status(401).send('usuario no autorizado')
    
    try {
      const encoder = new TextEncoder()
      const { payload } = await jwtVerify(authorization, 
      encoder.encode(process.env.JWT_PRIVATE_KEY)
      );
      
      req.id = payload.id
      
      next();
      
    }catch(error) {
      return res.status(401).send('Usuario no autorizado')
    }
}

export default userJWTDTO;