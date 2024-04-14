import { User,Car } from "../../db.js";
import bcrypt from "bcrypt";
import { generateToken } from "../../Utils/validation/index.js";
import parsedUser from "../../Helpers/parsedUser.js";
import dotenv from "dotenv";
dotenv.config();
const { DEFAULT_PASS, USER_IMAGE } = process.env;

//!>>>>>>>>>>>>> Funcion de login de usuario <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

const userLogin = async (email, password) => {
  const userf = await User.findOne({
    where: {
      email: email,
      deletedAt: false,
      enable: true,
    },
    include: [
      {
        model: Car,
        attributes: ["patent", "id"],
        through: { attributes: [] },
      },
    ],
  });

  try {
    if (userf && userf.enable === false) {
      throw new Error("Usuario bloqueado");
    }
    if (userf) {
      const passwordMatch = await bcrypt.compare(password, userf.password);
      if (passwordMatch) {
        // Contraseña válida, puedes generar y enviar un token de sesión aquí si es necesario
        let data = parsedUser(userf);
        // Genera el token
        const token = generateToken(userf);
        return { data, token };
      } else {
        // Contraseña incorrecta
        throw new Error("Email o password no validos");
      }
    } else {
      throw new Error("Usuario no registrado");
    }
  } catch (error) {
    throw error;
  }
};
//? >>>>>>>>>>>>>>>>> Funcion de creacion de usuario <<<<<<<<<<<<<<<<<<<<<<<<<<<<
const userCreate = async (email, name, typeId, numberId, country) => {
  // Método para registrar un nuevo usuario

  try {
    // Buscar el usuario por email
    const user = await User.findOne({
      where: {
        email: email,
        deletedAt: false,
      },
    });

    if (!user) {
      const nickname = email.split("@")[0];
      const hashedPassword = await bcrypt.hash(`${DEFAULT_PASS}`, 10);
      try {
        // Crear el nuevo usuario en la base de datos con la contraseña hasheada
        const newUser = await User.create({
          email: email,
          password: hashedPassword,
          nickname: nickname,
          name: name,
          typeId: typeId,
          numberId: numberId,
          picture: `${USER_IMAGE}`,
          country: country,
        });
        const data = parsedUser(newUser);
        //console.log("data" + data);
        //const token = generateToken(newUser);
        return { data };
      } catch (error) {
        throw new Error("Error al crear el usuario");
      }
    } else if (user) {
      throw new Error("El usuario ya tiene cuenta");
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;
  }
};

export { userLogin, userCreate };
