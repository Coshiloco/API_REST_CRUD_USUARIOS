import UserModel from '#Schemas/user.schema.js';

const userUpdateDataController = async (req, res) => {
    const { id } = req;
    const { name, surname } = req.body;

    const existingUserById = await UserModel.findById(id).exec();
    if (!existingUserById)
        return res.status(401).send({ errors: ['Usuario no autorizado'] });

    existingUserById.name = name;
    existingUserById.surname = surname;
  
    // EL save es para que se guarde una vez modificado
    await existingUserById.save();

    return res.send(`Usuario actualizado  ${existingUserById}`);
};

export default userUpdateDataController;