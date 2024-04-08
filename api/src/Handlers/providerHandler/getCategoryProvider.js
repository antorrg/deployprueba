//mostramos las categorías para los Post/Tips/Blog
import { CategoryProvider } from "../../db.js";

const getCategoryProvider = async (req, res) => {
  const { order } = req.query;

  try {
    const data = await CategoryProvider.findAll({
      order: [["descCategory", order || "ASC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener las Categorías de los Proveedores" });
  }
};

export default getCategoryProvider;
