//mostramos las categorías padre
import { Category } from "../../db.js";

const getCategoryFather = async (req, res) => {
  try {
    const data = await Category.findAll({ where: { parentId: null } });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener las Categorías" });
  }
};

export default getCategoryFather;
