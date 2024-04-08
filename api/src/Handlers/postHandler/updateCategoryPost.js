import { CategoryPost, Post } from "../../db.js";

const updateCategoryPost = async (req, res) => {
  const { idCategoryPost } = req.params;
  const { nameCategoryPost } = req.body;

  if (!idCategoryPost || !nameCategoryPost || nameCategoryPost === "") {
    return res
      .status(400)
      .json({ error: "Se requiere id de categoría y nuevo nombre" });
  }

  try {
    //verificar si la Categoría por id existe
    const categorySelect = await CategoryPost.findByPk(idCategoryPost);
    if (!categorySelect) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    await categorySelect.update({ descCategory: nameCategoryPost });
    const data = await CategoryPost.findAll({
      order: [["descCategory", "ASC"]],
    });
    //una vez actualizada devuelvo todas las categorías
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export default updateCategoryPost;
