import { Car } from "../../db.js";

//*===============Borrar usuario ==============
const deleteCar = async (id) => {
  try {
    if (!id) {throw new Error("No se encontró un id valido");}
    const car = await Car.findByPk(id);

    if (!car) { throw new Error("Vehiculo no encontrado");}
    const parsedData = {
      deletedAt: true,
    };
    const carUp = await car.update(parsedData);
    return carUp;
  } catch (error) {
    console.error("Error al borrar el vehiculo");
    throw error;
  }
  };

export default deleteCar;