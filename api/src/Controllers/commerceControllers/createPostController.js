import {Post, CategoryPost, sequelize} from '../../db.js';
import { throwError } from '../../Utils/errors/errorsHandlers.js';

export default {
createPost : async(titlePost, textPost, published, viewFavPost, imgPost, idCategory)=>{
    try {
        //declaro e inicializo una transaccion:
        let transaction;
        transaction = await sequelize.transaction();

        const categPost = await CategoryPost.findByPk(idCategory, {transaction});
        if(!categPost){throwError('Data not found', 404)}
        const postFound = await Post.findOne({
            where:{
                titlePost:titlePost
            }, transaction
        })
        if(postFound){throwError('This post already exists', 400)};
        const newPost = await Post.create({
            datePost : new Date(),
            titlePost:titlePost,
            textPost: textPost,
            imgPost: imgPost ?? [],
            published: published ?? false,
            viewFavPost: viewFavPost ?? false,
        }, {transaction})
        await categPost.addPost(newPost,{transaction})
        await transaction.commit();
        return newPost;
    } catch (error) {
        if (transaction) {
            await transaction.rollback();
        }
        throw error;
    }
},

}