import { User, Car } from "../db.js";
import {Op} from 'sequelize'
import { throwError } from "../Utils/errors/errorsHandlers.js";
import { getEmails } from "../Utils/SUcreate-protect/index.js";
import bcrypt from 'bcrypt'
import { generateToken } from "../Utils/validation/index.js";
import parsedUser from "../Helpers/parsedUser.js";
import env from '../envConfig.js'

export default {
    //? >>>>>>>>>>>>>>>>> Funcion de creacion de usuario <<<<<<<<<<<<<<<<<<<<<<<<<<<<
 userCreate : async (email, name, typeId, numberId, country) => {
    // Método para registrar un nuevo usuario
    try {
      // Buscar el usuario por email
      const user = await User.findOne({
        where: {
          email: email,
          deletedAt: false,
        },
      });
      if (user){throwError('El usuario ya tiene cuenta', 400)}
        const nickname = email.split("@")[0];
        const hashedPassword = await bcrypt.hash(env.DefaultPass, 10);
          // Crear el nuevo usuario en la base de datos con la contraseña hasheada
          const newUser = await User.create({
            email: email,
            password: hashedPassword,
            nickname: nickname,
            name: name,
            typeId: typeId,
            numberId: numberId,
            picture: env.UserImg,
            country: country,
          });
          const data = parsedUser(newUser);
          return { data };
    } catch (error) {
      throw error;
    }
  },
  //!>>>>>>>>>>>>> Funcion de login de usuario <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
userLogin : async (email, password) => {
    try{
    const userfound = await User.findOne({
      where: {
        email: email,
        deletedAt: false,
      },
      include: [
        {
          model: Car,
          attributes: ["patent", "id"],
          through: { attributes: [] },
        },
      ],
    });
      if(!userfound){{throwError('Usuario no registrado', 400)}}
      else if (userfound.enable === false) {throwError('Usuario bloqueado', 400)}
      else {
        const passwordMatch = await bcrypt.compare(password, userfound.password);
        if (!passwordMatch) {throwError('Email o password no validos', 400)}
          return { data :parsedUser(userfound),
                   token :generateToken(userfound),
                 };
      } 
    } catch (error) {
      throw error;
    }
  },
//*Obtener todos los usuarios:
getUsers : async () => {
    const {email1,email2} = getEmails()
    try {
      const response = await User.findAll({
        where: {
          deletedAt: false,
          email: {
            [Op.notIn]: [email1, email2] // Lista de correos electrónicos a excluir
        }
        },
        include: [
          {
            model: Car,
            attributes: ["patent", "id"],
            through: { attributes: [] },
          },
        ],
      });
      const data = response;
      if (!data) {throwError('Usuarios no hallados', 400)}
      return data;
    } catch (error) {
      throw error;
    }
},
userByQuery : async (numberId) => {
    try {
      const response = await User.findOne({
        where: {
          numberId: numberId,
          deletedAt: false,
        },
        include: [
          {
            model: Car,
            attributes: ["patent", "id"],
            through: { attributes: [] },
          },
        ],
      });
      const data = response;
      if (!data) {throwError('Usuario no hallado', 400)}
      return data;
    } catch (error) {
      throw error;
    }
},
userById : async (id) => {
    try {
      const response = await User.findByPk(id, {
        where: {
          deletedAt: false,
        },
        include: [
          {
            model: Car,
            attributes: ["patent", "id"],
            through: { attributes: [] },
          },
        ],
      });
      const data = response;
      if (!data) {throwError('Usuario no hallado', 400)}
      return data;
    } catch (error) {
      throw error;
    }
  },
//todo Funcion actualizacion usuario
updateUser : async (id, newData) => {
    try {
      if (!id) {
        const error = new Error('No se encontró un id valido'); error.status = 400; throw error;
      }
      const user = await User.findByPk(id);
  
      if (!user) {throwError('Usuario no hallado', 400)}
      //Si newData no contiene password toma este camino
      if (!newData.password) {
        const parsedData = {
          email: newData.email,
          name: newData.name,
          picture: newData.picture,
          typeId: newData.typeId,
          numberId: newData.numberId,
          role: parseFloat(newData.role), //convertir a numero
          country: newData.country,
          enable: Boolean(newData.enable), // Convertir a booleano
        };
        // Actualizar todos los campos
        const userUp = await user.update(parsedData);
        return userUp;
        //si tiene password lo encripta y luego actualiza el password de usuario:
      } else { 
        const hashedPassword = await bcrypt.hash(newData.password, 10);
        const parsedData = {password: hashedPassword,};
        const userUpd = await user.update(parsedData);
        return userUpd;
      }
    } catch (error) {
      throw error;
    }
  },
  
deleteUser : async (id) => {
   try {
     const userD = await User.findByPk(id);
     if(!userD){throwError('Usuario no encontrado', 400)};
     userD.update({deletedAt: true});
     return userD;
   } catch (error) {
    throw error;
   }
},
//Funcion creada exclusivamente para comparar el password ingresado 
//como metodo de seguridad antes de actulizar
compare : async(id, password)=>{
    const userf = await User.findByPk(id, {
        where: {
          deletedAt: false,
          enable: true,
        },
      });
      try {
        if (userf && userf.enable === false){throwError('Usuario bloqueado!', 400)}
        if (userf) {
          const passwordMatch = await bcrypt.compare(password, userf.password);
          if (passwordMatch) {
            let data= userf;
            return data;
          } else {throwError('Contraseña incorrecta', 400)}
        } else {throwError('Usuario no registrado', 404)}
      } catch (error) {
        throw error;
      }
 },
 //! Funcion para resetear el password
 updatePassword : async(id, bodys)=>{
    try {
        if(!id){
          const error = new Error('No se encontró un id valido'); error.status = 400; throw error;}
          const user = await User.findByPk(id);
          if (!user) {throwError('Usuario no encontrado', 404)}
          
          const hashedPassword = await bcrypt.hash(env.DefaultPass, 10);
          const userUp= await user.update(hashedPassword); 
          return userUp;
        } catch (error) {
          throw error;
        }
 },

}