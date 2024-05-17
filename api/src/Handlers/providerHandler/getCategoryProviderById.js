//mostramos las categorías para los Post/Tips/Blog
import { CategoryProvider } from "../../db.js";

const getCategoryProviderById = async (req, res) => {
  const { id } = req.params;
  console.log(idB);
  if (!id) {
    return res.status(400).json({ error: "Falta id de categoría" });
  }
  try {
    const data = await CategoryProvider.findByPk(id);
    if (data === null) {
      // Si es null, significa que no se encontraron categorías
      return res
        .status(404)
        .json({ error: "No se encontraron categorías de proveedores" });
    }
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener la Categoría de los Proveedores" });
  }
};

export default getCategoryProviderById;
