import { CategoryPost, Post } from "../../db.js";

const deletePost = async (req, res) => {
  const { idpost } = req.params;
  console.log(idpost);
  if (!idpost) {
    return res.status(400).json({ error: "Se requiere id de post" });
  }

  try {
    //verificar si el id post existe
    const postToDelete = await Post.findByPk(idpost);
    if (!postToDelete) {
      return res.status(400).json({ error: "Post no encontrado" });
    }

    await postToDelete.destroy();
    const data = await Post.findAll({
      order: [["datePost", "DESC"]],
    });
    //una vez eliminada devuelvo todos los post
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el post" });
  }
};

export default deletePost;
