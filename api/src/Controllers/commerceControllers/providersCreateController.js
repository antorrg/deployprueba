import {Provider, CategoryProvider, Province, sequelize} from '../../db.js'
import findFields from './helpers/findFields.js'
import { throwError } from '../../Utils/errors/errorsHandlers.js';


export default {
providersCreate : async(razonsocial, contacto, fantasia, direccion, ciudad, telefono, email, otro, img, idProvince, categories)=>{
    let transaction;
    try {
         transaction = await sequelize.transaction();
        const provinceFound = await Province.findByPk(idProvince,{transaction} )
        if(!provinceFound ){throwError('Province not found', 404)}

        const providerFound = await Provider.findOne({
            where:{
                razonsocial: razonsocial,
                ciudad:ciudad,
            }, transaction,
        });
        if(providerFound){throwError('This provider already exists', 400)}
        const newProvider = await Provider.create({
            razonsocial:razonsocial,
            contacto: contacto || "",
            fantasia:fantasia,
            direccion:direccion,
            ciudad:ciudad,
            telefono:telefono,
            email: email || "",
            otro: otro || "",
            img: img || "",
        },{transaction} )

        const categoryFound = await findFields(CategoryProvider, categories )
        await newProvider.addCategoryProvider(categoryFound, {transaction})
        await provinceFound.addProvider(newProvider, {transaction})
        await transaction.commit();
        return newProvider;
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
},

}