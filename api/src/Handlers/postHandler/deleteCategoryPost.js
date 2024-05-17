import { CategoryPost, Post } from "../../db.js";

const deleteCategoryPost = async (req, res) => {
  const { idCategoryPost } = req.params;

  if (!idCategoryPost) {
    return res.status(400).json({ error: "Se requiere id de categoría" });
  }

  try {
    //verificar si la Categoría por id existe
    const categorySelect = await CategoryPost.findByPk(idCategoryPost);
    if (!categorySelect) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    // Verificar si hay Post en la categoría a eliminar
    const postAssociated = await Post.findOne({
      where: { CategoryPostIdCategory: idCategoryPost },
    });

    //si postAssociated devuelve algo, es que hay algún Post con esa Categoría
    if (postAssociated) {
      return res.status(400).json({
        error:
          "No se puede eliminar la Categoría porque está asociada a un Tips",
      });
    }
    await categorySelect.destroy();
    const data = await CategoryPost.findAll({
      order: [["descCategory", "ASC"]],
    });
    //una vez eliminada devuelvo todas las categorías
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

export default deleteCategoryPost;
