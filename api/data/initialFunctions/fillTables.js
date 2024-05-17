// En un archivo donde se manejan las operaciones relacionadas con el llenado de datos (por ejemplo, fillData.js)
import dataBulk from './dataBulk.js';
import { Province, Provider, CategoryPost, Post, CategoryProvider, Commerce,  CategoryImg, User} from '../../src/db.js'; // Importa tus modelos de tablas
import { categoriesImages, categoryPost, categoryProviders, commerce, providers, provinces, tipMecanica, users} from '../archives/index.js'
import createCommerce from './createCommerce.js';
import postCreate from './postCreate.js'
import providerFunction from './providersFunction.js';
import usersFunction from './usersFuncions.js'



// Usa la función dataBulk para diferentes tablas y conjuntos de datos
const fillTables =async (table, data)=>{
    await dataBulk(Province, provinces, 0);
    await dataBulk(CategoryImg, categoriesImages,0);
    await dataBulk(CategoryProvider, categoryProviders,0);
    await dataBulk(CategoryPost, categoryPost,0);
   

    const existdatas = await Commerce.findAll();
    if (existdatas.length === 0 ) {
     // Hacer una lectura de los datos para llenar la tabla
    await createCommerce(commerce);
    console.log(`"Commerce: The table is filled successfully!"`);
         } else {
           console.log(`"Commerce: The table already contains data"`);//
         }
  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    const existPost = await Post.findAll();
    if (existPost.length ===0 ) {
     // Hacer una lectura de los datos para llenar la tabla
    await postCreate(tipMecanica);
     console.log(`"Post: The table is filled successfully!"`);
           } else {
           console.log(`"Post: The table already contains data"`);//
         }
//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><
          const existProv = await Provider.findAll();
             if (existProv.length ===0 ) {
            // Hacer una lectura de los datos para llenar la tabla
            await providerFunction(providers);
             console.log(`"Provider: The table is filled successfully!"`);
                   } else {
              console.log(`"Provider: The table already contains data"`);//
                   }
                   //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>><
          const existUsers = await User.findAll();
          if (existUsers.length ===2 ) {
         // Hacer una lectura de los datos para llenar la tabla
         await usersFunction(users);
          console.log(`"Users: The table is filled successfully!"`);
                } else {
           console.log(`"Users: The table already contains data"`);//
                }
}

export default fillTables;
