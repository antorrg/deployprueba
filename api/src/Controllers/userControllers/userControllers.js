import { User, Car } from "../../db.js";
import {Op} from 'sequelize'
import { getEmails } from "../../Utils/SUcreate-protect/index.js";
import bcrypt from 'bcrypt'


const getUsers = async () => {
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
    if (!data) {
      throw new Error("Users not found");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const userByQuery = async (numberId) => {
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
    if (!data) {
      throw new Error("Car not found");
    }
    return data;
  } catch (error) {
    throw error;
  }
};
const userById = async (id) => {
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
    if (!data) {
      throw new Error("User not found!");
    }
    return data;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (id, newData) => {
 
  try {
    if (!id) {
      throw new Error("No se encontró un id valido");
    }
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("Usuario no encontrado");
    }//Si newData con contiene password toma este camino
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
      const parsedData = {
        password: hashedPassword,
      };
      const userUpd = await user.update(parsedData);
      return userUpd;
    }
  } catch (error) {
    console.error("Error al actualizar el usuario");
    throw error;
  }
};

const deleteUser = async (id) => {
 try {
   const userD = await User.findByPk(id);
   if(!userD){throw new Error('Usuario no encontrado')};
   userD.update({deletedAt: true});
   return userD;
 } catch (error) {
  throw error;
 }
};

export { getUsers, userByQuery, userById, updateUser, deleteUser };
