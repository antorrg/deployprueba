import { CategoryProvider, Provider, Province } from "../../db.js";
import findFields from "../../Controllers/commerceControllers/helpers/findFields.js";
import dataParsed from './helpers/dataParsed.js'

const updateProvider = async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const categories = newData.categories
  console.log(categories)

  const provinces = dataParsed(newData.idProvince, false)

  const catProv = await dataParsed(categories, true)
  const cats = await findFields(CategoryProvider, catProv)


  

  //verificar si recibe idProvider
  if (!id) { const error = new Error('Se requiere id del Proveedor a modificar')
                     error.status = 400;
                    throw error;}

  try {
    //verificar si el Provider por id existe
    const providerSelected = await Provider.findByPk(id);
    if (!providerSelected) { const error = new Error('Proveedor no encontrado');
                            error.status = 400;
                            throw error}
    
    // Actualizar el Proveedor con los datos proporcionados
   const provNew =  await providerSelected.update({
      razonsocial : newData.razonsocial,
      fantasia: newData.fantasia,
       contacto: newData.contacto,
       direccion: newData.direccion,
       ciudad: newData.ciudad,
       telefono: newData.telefono,
       email: newData.email,
       otro: newData.otro,
       img: newData.img,
    });
    
    //si se debe actualizar idProvince, verificar que exista
    if (newData.idProvince) {
      

      const existProvince = await Province.findByPk(provinces);
      if (!existProvince) {const error = new Error('Provincia inexistente');
                          error.status = 400; throw error;}
      await existProvince.addProvider(provNew)
    }

    await provNew.removeCategoryProvider((await provNew.getCategoryProviders()))
    if (!provNew) { const error = new Error('Proveedor no encontrado');
                            error.status = 400;
                            throw error}
    
      for (const category of cats) {
        await provNew.addCategoryProvider(category);
    }

    res.status(200).json(provNew);
  } catch (error) {
    console.error(error);
    res.status(error.status|| 500).json({ error: error.message});
  }
};

export default updateProvider;
  // "razonsocial": "Tukis SA",
        // "fantasia": "Tukis",
        // "contacto": null,
        // "direccion": "Avellaneda xxx",
        // "ciudad": "San Miguel",
        // "telefono": "5411000000",
        // "email": "batuk@batuk.com",
        // "otro": null,
        // "img": null,
        // "idProvince": 1,
        // "categories": [2,3]

    //     //si se debe actualizar idCategory, verificar que exista
    