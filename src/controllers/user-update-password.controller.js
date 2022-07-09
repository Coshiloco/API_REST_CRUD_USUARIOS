import UserModel from '#Schemas/user.schema.js';
import { compare, hash } from 'bcrypt';

const userUpdatePasswordController = async (req, res) => {
    const { id } = req;
    const { oldPassword, newPassword  } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });
        
    // Tenemos que comparar la contraseña del body y la hashed password se compara
    const checkPassword = await compare(oldPassword, existingUserById.password)
    
    // CUando la contraseña es incorrecta
    if(!checkPassword) return res.status(401).send('Credenciales incorrectas')

    const hashedPassword = await hash(newPassword,13);
    existingUserById.password = hashedPassword;
  
    // EL save es para que se guarde una vez modificado
    await existingUserById.save();

    return res.send(` Contraseña del Usuario actualizado  ${existingUserById}`);
};

export default userUpdatePasswordController;