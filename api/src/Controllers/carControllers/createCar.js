import { User, Car , sequelize} from "../../db.js";

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



export default createCar
