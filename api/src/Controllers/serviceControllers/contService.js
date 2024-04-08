import { Car, Service } from '../../db.js';
import { Op } from 'sequelize';

const createService = async ( type, detail, date_in, date_out, observations, picture, carId) => {
    try {
        // Buscar el automóvil
        const carFound = await Car.findByPk(carId);
        if (!carFound) {
            throw new Error('Automóvil no encontrado');
        }

        // Verificar si ya existe un servicio para las fechas especificadas
        const existingService = await Service.findOne({
            where: {
                 CarId: carId,
                date_in: { [Op.lte]: date_out },
                date_out: { [Op.gte]: date_in },
                enable: true,
                deletedAt: false
            }
        });

        if (existingService) {
            throw new Error('Ya existe un servicio para estas fechas');
        }

        // Crear el nuevo servicio
        const newService = await Service.create({
            type: type,
            detail: detail,
            date_in: date_in,
            date_out: date_out,
            observations: observations,
            picture: picture
        });

        // Asociar el servicio al automóvil
        await carFound.addService(newService);

        return newService;
    } catch (error) {
        // Manejar errores
        console.error('Error al crear el servicio:', error);
        throw error;
    }
};



const updateService = async(id, newData)=>{
    try {
        if(!id){
            throw new Error('No se encontró un id valido')
        }
        const user = await User.findByPk(id);
    
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

const deleteService= async (id)=>{
    console.log('Todavia no estoy lista (deberia borrar)')
}

export {
    createService,
    updateService,
    deleteService
}