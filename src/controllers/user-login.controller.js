// Librerias
import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';
import { SignJWT } from 'jose';
const userLoginController = async (req, res) => {
    // COjemos la informacion que nso da el usuario
    const { email, password } = req.body;
    /** Vamos a buscar primero por el email que es mas facil
    para saber si previamente esta logeado y una vez hecho
     buscamos por al contraseña */
    const existingUserByEmail = await UserModel.findOne({email}).exec();
    if (!existingUserByEmail)
        return res
            .status(401)
            .send({ errors: ['Credenciales incorrectas'] });
            
    // Tenemos que comparar la contraseña del body y la hashed password se compara
    const checkPassword = await compare(password, existingUserByEmail.password)
    
    // CUando la contraseña es incorrecta
    if(!checkPassword) return res.status(401).send('Credenciales incorrectas')
    
    // Si es true tenemos que generar el json web token para que el usuario verifique luego
    
    const jwtConstructor = new SignJWT({id: existingUserByEmail._id});
    
    const encoder = new TextEncoder()
    
    const jwt = await jwtConstructor.setProtectedHeader({
        alg: 'HS256',
        typ: 'JWT',
    })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
    
    return res.send({ jwt });
};

export default userLoginController;