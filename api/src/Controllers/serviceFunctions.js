import { Car, Service } from '../db.js';
import { Op } from 'sequelize';
import { throwError } from '../Utils/errors/errorsHandlers.js';
import {emptyResServ} from '../Utils/emptyRes.js';


export default {
createService : async ( type, detail, date_in, date_out, observations, picture, carId) => {
    try {
        // Buscar el automóvil
        const carFound = await Car.findByPk(carId);
        if (!carFound) {throwError('Automotor no encontrado', 404)}
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

        if (existingService) {throwError('Ya existe un servicio para estas fechas', 400)}

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
       
        throw error;
    }
},
getService : async () => {
    try {
        const response = await Service.findAll({
            where:{
                deletedAt:false,
            }, 
            include: [{ model: Car, attributes: ['id', 'patent'] }]
        });
        const data = response;
        if(!data){throwError('Servicio no encontrado', 404)}
        if(data.length===0){return emptyResServ();};
        return data;
    } catch (error) {
        throw error;
    }
},
getServiceByQuery : async (CarId) => {
        try {
            // Buscar todos los servicios relacionados con el ID del coche
            const services = await Service.findAll({
                where: {
                    CarId: CarId
                }, 
                include: [{ model: Car, attributes: ['id', 'patent'] }]
            });
    
            // Verificar si se encontraron servicios
            if (services.length === 0){
                return emptyResServ();
            }
            return services;
        } catch (error) {
            throw error;
        }
    },

serviceById : async (id)=>{
    try {
        const response = await Service.findByPk(id,{
            where:{
                deletedAt:false,
            },
            include: [{ model: Car, attributes: ['id', 'patent'] }]
        });
        const data = response;
        if(!data){throwError('Servicio no hallado', 404)}
        return data;
    } catch (error) {
        throw error;
    }
},
updateService : async(id, newData)=>{
    console.log(id)
    console.log(newData)
    console.log('aun no estoy lista, deberia actualizar')
   
},
deleteService : async (id)=>{
    console.log('Todavia no estoy lista (deberia borrar)')
},


}