import {User} from '../../db.js';
import bcrypt from 'bcrypt';

//Funcion creada exclusivamente para comparar el password ingresado 
//como metodo de seguridad antes de actulizar
const compare = async(id, password)=>{
    const userf = await User.findByPk(id, {
        where: {
          deletedAt: false,
          enable: true,
        },
      });
      try {
        if (userf && userf.enable === false){const error = new Error('Usuario bloqueado'); error.status = 400; throw error;}
      
        if (userf) {
          const passwordMatch = await bcrypt.compare(password, userf.password);
          if (passwordMatch) {
            // Contraseña válida, puedes generar y enviar un token de sesión aquí si es necesario
            let data= userf;
            return data;
          } else {
            // Contraseña incorrecta
            const error = new Error('Password no valido'); error.status = 400; throw error;
            
          }
        } else {
          const error = new Error('Usuario no registrado'); error.status = 404; throw error;
         
        }
      } catch (error) {
        throw error;
      }
};

export default compare;