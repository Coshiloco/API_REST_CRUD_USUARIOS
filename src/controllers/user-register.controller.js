import UserModel from '#Schemas/user.schema.js';
import { hash } from 'bcrypt';

const userRegisterController = async (req, res) => {
    // COjemos la informacion que nso da el usuario
    const { _id, name, surname, email, password } = req.body;
    // COmprobamos si este ya ha sido registrado es decir buscamos en nuestra BBDD
    // que tenga el mismo id
    const existingUserById = await UserModel.findById(_id).exec();
    if (existingUserById)
        return res
            .status(409)
            .send({ errors: ['Ya existe un usuario con ese id registrado'] });
    // COmprobamos si este ya ha sido registrado es decir buscamos en nuestra BBDD
    // que tenga el mismo email
    const existingUserByEmail = await UserModel.findOne({ email }).exec();
    if (existingUserByEmail)
        return res
            .status(409)
            .send({
                errors: ['Ya existe un usuario con ese email registrado'],
            });
    // COn la libreria Bycript hasheamos la contraseña
    const hashedPassword = await hash(password,13);
    // Guardamos los datos obtenidos en nuestra variable usuario
    const user = new UserModel({
        _id,
        name,
        surname,
        email,
        password: hashedPassword
    });
    // Lo guarda en la BBDD
    await user.save();
    // ENviamos una respuesta
    return res.status(201).send('Usuario registrado con éxito');
};

export default userRegisterController;