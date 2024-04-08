import createPost from '../../src/Controllers/commerceControllers/createPostController.js';


const postCreate = async(typeData)=>{
for (let i = 0; i <typeData.length; i++) {
    const data = typeData[i];

    try {
        // Llamar al controlador post aquí, usando los datos del json
        await createPost(data.titlePost, data.textPost, data.published, data.viewFavPost, data.imgPost, data.idCategory);

        console.log(`Successfully created: ${data.titlePost}`);
    } catch (error) {
        console.error(`Error when posting : ${data.titlePost}: ${error.message}`);
    }
}
}

export default postCreate;
