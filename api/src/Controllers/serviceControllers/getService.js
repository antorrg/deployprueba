import {Service, Car} from '../../db.js';
import {emptyResServ} from '../../Utils/emptyRes.js';

const getService = async () => {
    try {
        const response = await Service.findAll({
            where:{
                deletedAt:false,
            }, 
            include: [{ model: Car, attributes: ['id', 'patent'] }]
        });
        const data = response;
        if(!data){const error = new Error('Service not found'); error.status = 400; throw error;}
        if(data.length===0){return emptyResServ();};
        return data;
    } catch (error) {
        throw error;
    }
}
const getServiceByQuery = async (CarId) => {
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
    }

const serviceById = async (id)=>{
    try {
        const response = await Service.findByPk(id,{
            where:{
                deletedAt:false,
            },
            include: [{ model: Car, attributes: ['id', 'patent'] }]
        });
        const data = response;
        if(!data){const error = new Error('Service not found'); error.status = 400; throw error;}
        return data;
    } catch (error) {
        throw error;
    }
}

export{
    getService,
    getServiceByQuery,
    serviceById
};