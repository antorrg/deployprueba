import { CategoryPost, Post } from "../../db.js";

const updatePost = async (req, res) => {
  const { idPost } = req.params;
  const updateData = req.body;
  const { idCategory } = req.body;

  //verificar si recibe idPost
  if (!idPost) {
    return res
      .status(400)
      .json({ error: "Se requiere id del Post a modificar" });
  }

  try {
    //verificar si el Post por id existe
    const postSelected = await Post.findByPk(idPost);
    if (!postSelected) {
      return res.status(400).json({ error: "Post no encontrado" });
    }
    //si se debe actualizar idCategory, verificar que exista
    if (idCategory) {
      const existCategory = await CategoryPost.findByPk(idCategory);
      if (!existCategory) {
        return res.status(400).json({ error: "Categoría de post inexistente" });
      }
    }
    // Actualizar el Post con los datos proporcionados
    await postSelected.update(updateData);

    // Devolver los datos actualizados del Post
    const updatedPost = await Post.findByPk(idPost);

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export default updatePost;
