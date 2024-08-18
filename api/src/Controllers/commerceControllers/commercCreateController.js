import {Commerce, Province, sequelize} from '../../db.js';
import { throwError } from '../../Utils/errors/errorsHandlers.js';

export default {
commerceCreate : async(razonsocial, fantasia, direccion, ciudad, idProvince, telefono, celular, email,instagram, facebook, otro)=>{
    try { 
        let transaction;
        // Iniciar una transacción
        transaction = await sequelize.transaction();

        const provFound = await Province.findByPk(idProvince, {transaction})
        if(!provFound){throwError('Esta provincia no existe', 404)};

        const datafound = await Commerce.findOne({
            where:{
                razonsocial:razonsocial,
                otro: otro,
            },transaction,
        });
        if(datafound){throwError('Este comercio o filial ya existe', 400)}
        const newdata = await Commerce.create({
           razonsocial:razonsocial,
           fantasia:fantasia,
           direccion:direccion,
           ciudad:ciudad,
           telefono:telefono,
           celular: celular,
           email: email,
           instagram: instagram,
           facebook: facebook,
           otro: otro,
        }, {transaction})

       await provFound.addCommerce(newdata, {transaction})
       await transaction.commit();
       return newdata
        
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
}

}
