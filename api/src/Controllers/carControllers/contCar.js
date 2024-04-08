import { User, Car , sequelize} from "../../db.js";
import { Transaction } from 'sequelize';

//* Esta función crea un vehiculo y lo relaciona con el usuario:


 const createCar = async(
  idUser,
  patent,
  mark,
  model,
  year,
  motorNum,
  chassisNum,
  observations,
  picture
) =>{
  const transaction = await sequelize.transaction(); // Iniciar una transacción

  try {
    // Buscar el usuario dentro de la transacción
    const user = await User.findByPk(idUser, { transaction });

    if (!user) {
      throw new Error("Usuario no hallado");
    }

    // Validar el vehículo dentro de la transacción
    const car = await Car.findOne({
      where: {
        patent: patent.toLowerCase(),
      },
      transaction,
    });

    if (car) {
      throw new Error("Vehículo ya existente");
    }

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
}

//*======= Actualizar vehiculo ==================
const updateCar = async (id, newData) => {
  try {
    if (!id) {
      throw new Error("No se encontró un id valido");
    }
    const car = await Car.findByPk(id);

    if (!car) {
      throw new Error("Vehiculo no encontrado");
    }
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
    const userUp = await user.update(parsedData);
    return userUp;
  } catch (error) {
    console.error("Error al actualizar el vehiculo");
    throw error;
  }
};
//*===============Borrar usuario ==============
const deleteCar = async (id) => {
  console.log("Todavia no estoy lista (deberia borrar)");
};

export { createCar, updateCar, deleteCar };
