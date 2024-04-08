//mostramos las categorías para los Post/Tips/Blog
import { CategoryPost } from "../../db.js";

const getCategoryPost = async (req, res) => {
  try {
    const data = await CategoryPost.findAll({
      order: [["descCategory", "ASC"]],
    });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error al obtener las Categorías de los Post" });
  }
};

export default getCategoryPost;
