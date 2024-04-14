import { Service } from "../../db.js";

const updateService = async(id, newData)=>{
    try {
        if(!id){
            throw new Error('No se encontró un id valido');
        }
        const user = await Service.findByPk(id);
    
        if (!user) {
          throw new Error("Usuario no encontrado");
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

export default updateService;