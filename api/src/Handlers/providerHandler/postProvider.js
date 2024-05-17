import {  sequelize } from "../../db.js";
import providersCreate from "../../Controllers/commerceControllers/providersCreateController.js";

const postProvider = async (req, res) => {
  const {
    razonsocial,
    fantasia,
    contacto,
    direccion,
    ciudad,
    telefono,
    email,
    otro,
    img,
    idProvince,
    categories,
  } = req.body;

  if (
    !razonsocial ||
    !fantasia ||
    !direccion ||
    !ciudad ||
    !telefono ||
    !idProvince||
     !categories||
     categories.length===0
  ) {
    return res.status(400).json({ error: "Faltan datos para el Proveedor" });
  }

  try {
    // Convertir razonsocial a minúsculas antes de realizar la búsqueda
    const razonsocialLowerCase = sequelize.fn("LOWER", razonsocial);

    //! Crear el post (ver las imagenes a guardar)
    const data = await providersCreate(razonsocialLowerCase, fantasia, contacto, direccion, ciudad, telefono, email, otro, img, idProvince, categories)
   
    res.status(201).json(data);
  } catch (error) {
    res.status(error.status).json({error:error.message})
  }  
  
};

export default postProvider;


//try {
  // Convertir razonsocial a minúsculas antes de realizar la búsqueda
  //const razonsocialLowerCase = sequelize.fn("LOWER", razonsocial);

  // // Verificar si ya existe otro proveedor con la misma razonsocial
  // const existingProvider = await Provider.findOne({
  //   where: sequelize.where(
  //     sequelize.fn("LOWER", sequelize.col("razonsocial")),
  //     Op.iLike,
  //     razonsocialLowerCase
  //   ),
  // });

  // // Si ya existe, devolver un error
  // if (existingProvider) {
  //   return res
  //     .status(400)
  //     .json({ error: "Existe un Proveedor con la misma razón social" });
  // }

  // // Verificar si todas las categorías proporcionadas existen
  // const categoriesFound = await CategoryProvider.findAll({
  //   where: { id: categories },
  // });

  // // Verificar si el número de categorías encontradas coincide con el número proporcionado
  // if (categoriesFound.length !== categories.length) {
  //   return res.status(400).json({ error: "Alguna(s) categoría(s) no existe(n)" });
  // }

  // //verificar si el idProvince existe en las Provincias, y si no devolver error
  // const provinceSelected = await Province.findByPk(idProvince);
  // if (!provinceSelected) {
  //   return res.status(400).json({ error: "No existe la Provincia" });
  // }
  //! Crear el post (ver las imagenes a guardar)
 
  // const createdProvider = await Provider.create({
  //   razonsocial,
  //   fantasia,
  //   contacto: contacto || "",
  //   direccion,
  //   ciudad,
  //   telefono,
  //   email: email || "",
  //   otro: otro || "",
  //   img: img || "",
  // });
  // await createdProvider.addCategories(categoriesFound )

  // await provinceSelected.addProvider(createdProvider)

  //devolvemos SOLO el Proveedor creado, para reordenarlos usar método GET correspondiente
  // const data = await Provider.findOne({
  //   where: { id: createdProvider.id },
  //   include: [
  //     { model: CategoryProvider, attributes: ["descCategory"] },
  //     { model: Province, attributes: ["descProvince"] },
  //   ],
  // });
//   res.status(201).json(data);
// } catch (error) {
//   res.status(error.status).json({error:error.message})
// }  

//};

//export default postProvider;
