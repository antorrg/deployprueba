import { CategoryProvider, Provider } from "../../db.js";


const deleteCategoryProvider = async (req, res) => {
  const { id } = req.params;
  const { order } = req.query;

  if (!idA) {
    return res.status(400).json({ error: "Se requiere id de categoría" });
  }

  try {
    //verificar si la Categoría por id existe
    const categorySelect = await CategoryProvider.findByPk(id);
    if (!categorySelect) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    // Verificar si hay Post en la categoría a eliminar
    const postAssociated = await Provider.findOne({
      where: { idCategory: id },
    });

    //si postAssociated devuelve algo, es que hay algún Post con esa Categoría
    if (postAssociated) {
      return res.status(400).json({
        error:
          "No se puede eliminar la Categoría porque está asociada a un Proveedor",
      });
    }
    await categorySelect.destroy();
    const data = await CategoryProvider.findAll({
      order: [["descCategory", order || "ASC"]],
    });
    //una vez eliminada devuelvo todas las categorías
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar la categoría" });
  }
};

export default deleteCategoryProvider;
