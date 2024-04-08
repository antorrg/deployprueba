//mostramos todos los Post/Tips/Blog marcados como favoritos
import { Post, CategoryPost } from "../../db.js";

const getPostFav = async (req, res) => {
  const total = parseInt(req.query.total, 10) || 3;
  console.log(total);
  try {
    const data = await Post.findAll({
      where: { viewFavPost: true, published: true },
      include: [{ model: CategoryPost, attributes: ["descCategory"] }],
      limit: total,
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los Post" });
  }
};

export default getPostFav;
