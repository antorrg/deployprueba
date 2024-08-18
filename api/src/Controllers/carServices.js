import { User, Car , sequelize} from "../db.js";
import { throwError } from "../Utils/errors/errorsHandlers.js";
import { emptyResCar } from '../Utils/emptyRes.js';

export default {
createCar : async(idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture) =>{
        const transaction = await sequelize.transaction(); // Iniciar una transacción
      
        try {
          // Buscar el usuario dentro de la transacción
          const user = await User.findByPk(idUser, { transaction });
          if (!user) {throwError("Usuario no hallado", 404)}
          // Validar el vehículo dentro de la transacción
          const car = await Car.findOne({
            where: {
              patent: patent.toLowerCase(),
            },
            transaction,
          });
          if (car) { throwError("Vehículo ya existente", 400)}
          // Crear el vehículo dentro de la transacción
          const newCar = await Car.create(
            {
              patent,
              mark,
              model,
              year,
              motorNum,
              chassisNum,
              observations,
              picture,
            },
            { transaction }
          );
          // Asociar el vehículo al usuario dentro de la transacción
          await user.addCar(newCar, { transaction });
          // Confirmar la transacción si no hay errores
          await transaction.commit();
          return newCar;
        } catch (error) {
          // Deshacer la transacción si hay errores
          await transaction.rollback();
          throw error;
        }
      },
 getCar : async () => {
        try {
            const response = await Car.findAll({
                where:{
                    deletedAt:false,
                },  include: [
                             {
                               model: User,
                               attributes: ["name" , "id"],
                               through: { attributes: [] },
                              }]
            });
            const data = response;
            if(!data){throwError('Server error'), 500}
            if(data.length===0){return emptyResCar()};
            return data;
        } catch (error) {
            throw error;
        }
    },
getByQuery : async(patent)=>{
        try {
            const response = await Car.findOne({
                where:{
                    patent:patent,
                    deletedAt:false,
                }, include: [
                    {
                      model: User,
                      attributes: ["name" , "id"],
                      through: { attributes: [] },
                    }]
            });
            const data = response;
            if(!data){throwError('Car not found', 404)};
            return data;
        } catch (error) {
            throw error;
        }
    },
carById : async (id)=>{
        try {
            const response = await Car.findByPk(id,{
                where:{
                    deletedAt:false,
                },
                include: [
                    {
                      model: User,
                      attributes: ["name" , "id"],
                      through: { attributes: [] },
                     }]
            });
            const data = response;
            if(!data){throwError('Car not found', 404)}
            return data;
        } catch (error) {
            throw error;
        }
},
//*======= Actualizar vehiculo ==================
updateCar : async (id, newData) => {
      try {
        const car = await Car.findByPk(id);
        if (!car) {throwError("Vehiculo no encontrado", 404)}

        const parsedData = {
          patent: newData.patent,
          mark: newData.mark,
          model: newData.model,
          year: newData.year, //Date.parse(newData.year) este no va
          motorNum: newData.motorNum,
          chassisNum: newData.chassisNum, 
          observations: newData.observations,
          picture:newData.picture,
          enable: Boolean(newData.enable) // Convertir a booleano
        };
        // Actualizar todos los campos
        const carUp = await car.update(parsedData);
        return carUp;
      } catch (error) {
        throw error;
      }
    },
updateDomCar : async (id, body) => {
        const userId = body.newData;
        let transaction;
        try {
            transaction = await sequelize.transaction();
            if (!userId) {throwError("No se encontró un índice válido", 404)}
    
            const newUser = await User.findByPk(userId, { transaction });
            if (!newUser) {throwError("Usuario no encontrado",404)}

            const car = await Car.findByPk(id, { transaction });
            if (!car) {throwError("Vehículo no encontrado", 404)}
    
            // Actualizar la relación entre el usuario y el vehículo
            await car.setUsers(newUser, { transaction });
    
            // Commit de la transacción
            await transaction.commit();
    
            return car;
        } catch (error) {
            if (transaction) {
                // Rollback de la transacción si ocurrió un error
                await transaction.rollback();
            }
            throw error;
        }
    },
 deleteCar : async (id) => {
        try {
          const car = await Car.findByPk(id);
      
          if (!car) {throwError("Vehiculo no encontrado",404)}
          const parsedData = {
            deletedAt: true,
          };
          const carUp = await car.update(parsedData);
          return carUp;
        } catch (error) {
          throw error;
        }
},

}