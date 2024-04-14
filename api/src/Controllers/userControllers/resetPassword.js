import {User} from '../../db.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const {DEFAULT_PASS} = process.env;

const updatePassword = async(id, bodys)=>{
    try {
        if(!id){
            throw new Error('No se encontró un id valido')
          }
          const user = await User.findByPk(id);
          
          if (!user) {
            throw new Error("Usuario no encontrado");
          }
          
          const hashedPassword = await bcrypt.hash(`${DEFAULT_PASS}`, 10);
          const parsedData = {
            password:hashedPassword,
          };
          const userUp= await user.update(parsedData); 
          console.log(bodys)
          return userUp;
        } catch (error) {
          console.error("Error al actualizar el usuario");
          throw error;
        }
      }
export default updatePassword