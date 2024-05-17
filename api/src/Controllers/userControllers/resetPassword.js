import {User} from '../../db.js'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv';
dotenv.config();
const {DEFAULT_PASS} = process.env;

const updatePassword = async(id, bodys)=>{
    try {
        if(!id){
          const error = new Error('No se encontró un id valido'); error.status = 400; throw error;
          
          }
          const user = await User.findByPk(id);
          
          if (!user) {
            const error = new Error('Usuario no encontrado'); error.status = 400; throw error;
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