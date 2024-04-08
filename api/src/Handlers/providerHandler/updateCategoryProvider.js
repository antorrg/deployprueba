import { CategoryProvider, Provider } from "../../db.js";

const updateCategoryProvider = async (req, res) => {
  //si recibimos order=ASC o DESC por query devolvemos todas las categorías ordenadas según
  const { id } = req.params;
  const { order } = req.query;
  const { nameCategoryProvider } = req.body;

  if (!id || !nameCategoryProvider || nameCategoryProvider === "") {
    return res
      .status(400)
      .json({ error: "Se requiere id de categoría y nuevo nombre" });
  }

  try {
    //verificar si la Categoría por id existe
    const categorySelect = await CategoryProvider.findByPk(id);
    if (!categorySelect) {
      return res.status(400).json({ error: "Categoría no encontrada" });
    }

    await categorySelect.update({ descCategory: nameCategoryProvider });
    const data = await CategoryProvider.findAll({
      order: [["descCategory", order || "ASC"]],
    });
    //una vez actualizada devuelvo todas las categorías
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export default updateCategoryProvider;
