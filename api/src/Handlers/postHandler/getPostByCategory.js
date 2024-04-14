//mostramos todos los Post/Tips/Blog ordenados por fecha
import { Post, CategoryPost } from "../../db.js";

const getPostByCategory = async (req, res) => {
  //idcategory será el id de la categoría
  //columnorder será datePost or titlePost para saber por qué columna ordenar
  //order será ASC or DESC
  //si no se proveen
  const { idCategory } = req.params;
  let { columnorder, order } = req.query;

  try {
    const data = await Post.findAll({
      where: {  CategoryPostIdCategory: idCategory },
      order: [[columnorder || "datePost", order || "DESC"]],
      include: [{ model: CategoryPost, attributes: ["descCategory"] }],
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los Post ENTRA ACAA" });
  }
};

export default getPostByCategory;
