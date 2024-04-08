//mostramos el Post/Tips/Blog según idPost
import { Post, CategoryPost } from "../../db.js";

const getPostByidPost = async (req, res) => {
  const { idPost } = req.params;
  try {
    const data = await Post.findOne({
      where: { idPost },
      include: [{ model: CategoryPost, attributes: ["descCategory"] }],
    });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener el Post" });
  }
};

export default getPostByidPost;
