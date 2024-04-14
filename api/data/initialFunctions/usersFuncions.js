import {userCreate} from '../../src/Controllers/userControllers/userLogin.js'

const usersFunction = async(typeData)=>{
    for (let i = 0; i <typeData.length; i++) {
        const data = typeData[i];
    
        try {
            // Llamar al controlador post aquí, usando los datos del json
            await userCreate(data.email, data.name, data.typeId, data.numberId, data.country);
    
            console.log(`Successfully created: ${data.name}`);
        } catch (error) {
            console.error(`Error when posting : ${data.name}: ${error.message}`);
        }
    }
    }

export default usersFunction;
