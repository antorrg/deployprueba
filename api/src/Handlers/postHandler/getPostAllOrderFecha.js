//mostramos todos los Post/Tips/Blog ordenados por fecha
import { Post, CategoryPost } from "../../db.js";

const getPostAllOrderFecha = async (req, res) => {
  const { order } = req.query;
  try {
    const data = await Post.findAll({
      order: [["datePost", order]],
      include: [{ model: CategoryPost, attributes: ["descCategory"] }],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los Post" });
  }
};

export default getPostAllOrderFecha;
