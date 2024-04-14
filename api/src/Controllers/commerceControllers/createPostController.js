import {Post, CategoryPost, sequelize} from '../../db.js';

const createPost = async(titlePost, textPost, published, viewFavPost, imgPost, idCategory)=>{
    try {
        //declaro e inicializo una transaccion:
        let transaction;
        transaction = await sequelize.transaction();

        const categPost = await CategoryPost.findByPk(idCategory, {transaction});
        if(!categPost){throw new Error('Data not found')}
        const postFound = await Post.findOne({
            where:{
                titlePost:titlePost
            }, transaction
        })
        if(postFound){throw new Error('This post already exists')};
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
}
export default createPost;




