import Category from "../../Models/Category.js";
import { Post, CategoryPost } from "../../db.js";
import createPost from "../../Controllers/commerceControllers/createPostController.js";

const postPost = async (req, res) => {
  //datePost usamos la fecha actual
  const {
    titlePost,
    textPost,
    imgPost,
    published,
    viewFavPost,
    other,
    idCategory,
  } = req.body;
  if (!titlePost || !textPost || !idCategory) {
    return res.status(400).json({ error: "Faltan datos para el Post" });
  }

  try {
    // Verificar si ya existe un Post con el mismo title
    const existingPost = await Post.findOne({
      where: { titlePost: titlePost },
    });
    // Si ya existe, devolver un error indicando que hay un Post con ese título
    if (existingPost) {
      return res
        .status(400)
        .json({ error: "Existe un Post con el mísmo título" });
    }

    //verificar si el idCategory existe en las Categorias, y si no devolver error
    const categorySelected = await CategoryPost.findByPk(idCategory);
    if (!categorySelected) {
      return res.status(400).json({ error: "No existe la Categoría" });
    }

    //! Crear el post (ver las imagenes a guardar)
    const createdPost = await createPost(titlePost, textPost, published, viewFavPost, imgPost, datePost, idCategory, other)
    // Post.create({
    //   datePost: new Date(),
    //   titlePost,
    //   textPost,
    //   imgPost: imgPost ?? [],
    //   published: published ?? false,
    //   viewFavPost: viewFavPost ?? false,
    //   other: other ?? "",
    //   idCategory,
    // });
    //devolvemos SOLO el Post creado, para reordenarlos usar método GET correspondiente
    //const data = await Post.findAll();
    res.status(201).json(createdPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear la categoría" });
  }
};

export default postPost;
