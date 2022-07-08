import UserModel from "#Schemas/user.schema.js";
import { hash } from 'bcrypt';

const userRegisterController = async (req,res) => {
    const {_id, name, surname, email, password} = req.body;
    
    // El punto exec es para devolverlo en modo promesa 
    const existingUserById =  await UserModel.findById(_id).exec();
    // Si existe el usuario le dcimos al usuario que entra en conflicto 
    if(existingUserById) return res.status(409).send('Ya existe el usuario registrado con este id');
    const existingUserByEmail =  await UserModel.findOne({email}).exec();
    // Si existe el email del usuario  le dcimos al usuario que entra en conflicto 
    if(existingUserByEmail) return res.status(409).send('Ya existe el usuario registrado con este email');
    
    /** SI no existe ya el usuario o el mail del usuario
    podemos registrarle siguiendo el esquema que previamente ya definimos
    pero la contraseña no puede ir en texto plano por lo que 
    tenemos que hashearla */
    
    // Generamos la contraseña con el hash
    
    const hashedPassword = await hash(password, 13)
      
    // Si el userModel esta en minusculas puede tomarlo como clase 
    const NewUser = new UserModel({
      _id,name,surname,email, password: hashedPassword
    });
    
    // GUardamos el usuario
    // const {password:ModifiedPassword,...datos} = await NewUser.save();
    const datos = await NewUser.save()
    
    const ObjectDataJSON = datos.toJSON()
    
    const ShowDataUserResponse = {
      _id: ObjectDataJSON._id,
      name: ObjectDataJSON.name,
      surname: ObjectDataJSON.surname,
      email: ObjectDataJSON.email
    }
 
    // Cuando todo ha sucedido con exito le mandamos al usuario que todo se hizo correctamente
    return res.send(ShowDataUserResponse);    
    
};


export default userRegisterController;