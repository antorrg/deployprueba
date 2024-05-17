import { CategoryPost, Post } from "../../db.js";

const updatePost = async (req, res) => {
  const { id } = req.params;
  const updatePost = req.body;
  const { idCategory } = req.body;

  //verificar si recibe id
  if (!id) {
    return res
      .status(400)
      .json({ error: "Se requiere id del Post a modificar" });
  }

  try {
    //verificar si el Post por id existe
    const postSelected = await Post.findByPk(id);
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
    await postSelected.update(updatePost);

    // Devolver los datos actualizados del Post
    const updatedPost = await Post.findByPk(id);

    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar la categoría" });
  }
};

export default updatePost;
