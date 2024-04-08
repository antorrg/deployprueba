//mostramos todos los Post/Tips/Blog ordenados por fecha
import { Post, CategoryPost } from "../../db.js";

const getPostPublish = async (req, res) => {
  //value será true or false, equivale a publicado o No publicado
  //columnorder será datePost or titlePost para saber por qué columna ordenar
  //order será ASC or DESC
  //si no se provee nada, se devuelven los Post publicados ordenados por fecha DESC

  let { value, columnorder, order } = req.query;

  // Si value no se proporciona, establecerlo como true por defecto
  value = value === undefined ? true : JSON.parse(value);

  try {
    const data = await Post.findAll({
      where: { published: value },
      order: [[columnorder || "datePost", order || "DESC"]],
      include: [{ model: CategoryPost, attributes: ["descCategory"] }],
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los Post" });
  }
};

export default getPostPublish;
