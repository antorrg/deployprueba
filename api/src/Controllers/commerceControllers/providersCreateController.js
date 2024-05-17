import {Provider, CategoryProvider, Province, sequelize} from '../../db.js'
import findFields from './helpers/findFields.js'

const providersCreate = async(razonsocial, contacto, fantasia, direccion, ciudad, telefono, email, otro, img, idProvince, categories)=>{
    let transaction;
    try {
         transaction = await sequelize.transaction();


        const provinceFound = await Province.findByPk(idProvince,{transaction} )
        if(!provinceFound ){const error = new Error('Province not found');
                            error.status = 400;
                            throw error;}

        const providerFound = await Provider.findOne({
            where:{
                razonsocial: razonsocial,
                ciudad:ciudad,
            }, transaction,
        });
        if(providerFound){const error = new Error('This provider already exists');
                          error.status = 400;
                          throw error;}
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
};

export default providersCreate;