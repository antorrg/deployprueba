import { Commerce, Province, sequelize } from '../../Configs/database.js'
import { throwError } from '../../Configs/errorHandlers.js'

export default {
  commerceCreate: async (razonsocial, fantasia, direccion, ciudad, idProvince, telefono, celular, email, instagram, facebook, otro) => {
    try {
      let transaction
      // Iniciar una transacción
      transaction = await sequelize.transaction()

      const provFound = await Province.findByPk(idProvince, { transaction })
      if (!provFound) { throwError('Esta provincia no existe', 404) };

      const datafound = await Commerce.findOne({
        where: {
          razonsocial,
          otro
        },
        transaction
      })
      if (datafound) { throwError('Este comercio o filial ya existe', 400) }
      const newdata = await Commerce.create({
        razonsocial,
        fantasia,
        direccion,
        ciudad,
        telefono,
        celular,
        email,
        instagram,
        facebook,
        otro
      }, { transaction })

      await provFound.addCommerce(newdata, { transaction })
      await transaction.commit()
      return newdata
    } catch (error) {
      if (transaction) {
        await transaction.rollback()
      }
      throw error
    }
  }

}
