import { User, Car, sequelize } from "../../db.js";

const updateDomCar = async (id, body) => {
    const userId = body.newData;
    let transaction;

    try {
        transaction = await sequelize.transaction();

        if (!userId) {
            const error = new Error("No se encontró un índice válido");error.status = 400; throw error;
        }

        const newUser = await User.findByPk(userId, { transaction });
        if (!newUser) {
            const error = new Error("Usuario no encontrado");error.status = 400; throw error;
        }

        if (!id) {
            const error = new Error("No se encontró un ID válido");error.status = 400; throw error;
          
        }

        const car = await Car.findByPk(id, { transaction });
        if (!car) {
            const error = new Error("Vehículo no encontrado");error.status = 500; throw error;
        
        }

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
        console.error("Error al actualizar el vehículo:", error);
        throw error;
    }
};

export default updateDomCar;