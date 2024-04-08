import { CategoryPost } from "../../db.js";

const postCategoryPost = async (req, res) => {
  const { nameCategoryPost } = req.body;
  try {
    // Verificar si ya existe una categoría con el mismo nombre
    const existingCategory = await CategoryPost.findOne({
      where: { descCategory: nameCategoryPost },
    });

    if (existingCategory) {
      // Si ya existe, devolver un error indicando que la categoría ya existe
      return res
        .status(400)
        .json({ error: "La categoría con ese nombre ya existe" });
    }

    // Si no existe, crear la nueva categoría
    const createdCategoryPost = await CategoryPost.create({
      descCategory: nameCategoryPost,
    });
    //devolvemos todas las categorías
    const data = await CategoryPost.findAll({
      order: [["descCategory", "ASC"]],
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export default postCategoryPost;
