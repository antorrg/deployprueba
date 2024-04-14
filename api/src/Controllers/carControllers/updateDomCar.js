import { User, Car, sequelize } from "../../db.js";

const updateDomCar = async (id, body) => {
    const userId = body.newData;
    let transaction;

    try {
        transaction = await sequelize.transaction();

        if (!userId) {
            throw new Error("No se encontró un índice válido");
        }

        const newUser = await User.findByPk(userId, { transaction });
        if (!newUser) {
            throw new Error("Usuario no encontrado");
        }

        if (!id) {
            throw new Error("No se encontró un ID válido");
        }

        const car = await Car.findByPk(id, { transaction });
        if (!car) {
            throw new Error("Vehículo no encontrado");
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