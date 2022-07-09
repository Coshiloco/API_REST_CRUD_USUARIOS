import UserModel from '#Schemas/user.schema.js';
import { compare } from 'bcrypt';

const userUpdateEmailController = async (req, res) => {
    const { id } = req;
    const { email, password  } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });
        
    // Tenemos que comparar la contraseña del body y la hashed password se compara
    const checkPassword = await compare(password, existingUserById.password)
    
    // CUando la contraseña es incorrecta
    if(!checkPassword) return res.status(401).send({ errors: ['Credenciales incorrectas']})

    existingUserById.email = email;
  
    // EL save es para que se guarde una vez modificado
    await existingUserById.save();

    return res.send(` Email del Usuario actualizado  ${existingUserById}`);
};

export default userUpdateEmailController;