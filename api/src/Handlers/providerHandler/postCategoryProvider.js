import { CategoryProvider } from "../../db.js";

const postCategoryProvider = async (req, res) => {
  //si por query recibimos ASC o DESC devolvemos todas las categorías de acuerdo a ese orden
  const { nameCategoryProvider } = req.body;
  const { order } = req.query;

  //si recibe cadena nula responde con error
  if (nameCategoryProvider === "") {
    return res
      .status(400)
      .json({ error: "Se necesita un nombre de categoría" });
  }
  try {
    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategory = await CategoryProvider.findOne({
      where: { descCategory: nameCategoryProvider },
    });

    if (existingCategory) {
      // Si ya existe, devolver un error indicando que la categoría ya existe
      return res
        .status(400)
        .json({ error: "La categoría con ese nombre ya existe" });
    }

    // Si no existe, crear la nueva categoría
    const createdCategory = await CategoryProvider.create({
      descCategory: nameCategoryProvider,
    });
    //devolvemos todas las categorías
    const data = await CategoryProvider.findAll({
      order: [["descCategory", order || "ASC"]],
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export default postCategoryProvider;
