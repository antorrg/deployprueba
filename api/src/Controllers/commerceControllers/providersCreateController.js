import {Provider, CategoryProvider, Province, sequelize} from '../../db.js'

const providersCreate = async(razonsocial, fantasia, direccion, ciudad, telefono, email, idProvince, idCategory)=>{
    try {
         let transaction;
         transaction = await sequelize.transaction();

        const categoryFound = await CategoryProvider.findByPk(idCategory, {transaction});
        if(!categoryFound){throw new Error('CategoryProv. not found')}

        const provinceFound = await Province.findByPk(idProvince,{transaction} )
        if(!provinceFound ){throw new Error('Province not found')}

        const providerFound = await Provider.findOne({
            where:{
                razonsocial: razonsocial,
                ciudad:ciudad,
            }, transaction,
        });
        if(providerFound){throw new Error('This provider already exists')}
        const newProvider = await Provider.create({
            razonsocial:razonsocial,
            fantasia:fantasia,
            direccion:direccion,
            ciudad:ciudad,
            telefono:telefono,
            email:email,
        },{transaction} )

        await categoryFound.addProvider(newProvider, {transaction})
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

