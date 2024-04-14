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







export default createService;