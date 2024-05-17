import { Car } from "../../db.js";

//*===============Borrar usuario ==============
const deleteCar = async (id) => {
  try {
    if (!id) {const error = new Error("No se encontró un id valido"); error.status = 400; throw error;}
    const car = await Car.findByPk(id);

    if (!car) {const error = new Error("Vehiculo no encontrado"); error.status = 404; throw error;}
    const parsedData = {
      deletedAt: true,
    };
    const carUp = await car.update(parsedData);
    return carUp;
  } catch (error) {
   
    throw error;
  }
  };

export default deleteCar;