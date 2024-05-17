import { Service } from "../../db.js";

const updateService = async(id, newData)=>{
    try {
        if(!id){const error = new Error('No se encontro un id valido'); error.status = 400; throw error;
           
        }
        const user = await Service.findByPk(id);
    
        if (!user) {const error = new Error('Usuario no encontrado'); error.status = 400; throw error;
         
        }
        if(!newData.password){
          const parsedData = {
            email:newData.email,
            name: newData.name,
            picture: newData.picture,
            typeId: newData.typeId,
            numberId:newData.numberId,
            role: parseFloat(newData.role), //convertir a numero
            country: newData.country,
            enable: Boolean(newData.enable), // Convertir a booleano
          };
          // Actualizar todos los campos
          const userUp =await user.update(parsedData);
          return userUp;
        }else{
            const hashedPassword = await bcrypt.hash(newData.password, 10);
            const parsedData = {
              password:hashedPassword,
             };
         const userUp= await user.update(parsedData); 
         return userUp;
        }

      } catch (error) {
        console.error("Error al actualizar el usuario");
       throw error;
      }
}

export default updateService