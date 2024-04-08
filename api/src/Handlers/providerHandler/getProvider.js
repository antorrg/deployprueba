import { Provider, CategoryProvider, Province } from "../../db.js";
import { Op } from "sequelize";

const getProvider = async (req, res) => {
  const { searchRazon, searchFantasia, searchContacto, filterCategory, order } =
    req.query;

  let data;

  try {
    if (searchRazon) {
      //ejemplo http://localhost:3001/allproviders?searchRazon=blue
      data = await Provider.findAll({
        where: {
          razonsocial: {
            [Op.iLike]: `%${searchRazon}%`, // Búsqueda de texto parcial
          },
        },
        order: [["razonsocial", order || "ASC"]],
        include: [
          { model: CategoryProvider, attributes: ["descCategory"] },
          { model: Province, attributes: ["descProvince"] },
        ],
      });
    } else if (searchFantasia) {
      //ejemplo de queries:  http://localhost:3001/allproviders?order=DESC&searchFantasia=bat
      data = await Provider.findAll({
        where: {
          fantasia: {
            [Op.iLike]: `%${searchFantasia}%`, // Búsqueda de texto parcial
          },
        },
        order: [["fantasia", order || "ASC"]],
        include: [
          { model: CategoryProvider, attributes: ["descCategory"] },
          { model: Province, attributes: ["descProvince"] },
        ],
      });
    } else if (searchContacto) {
      data = await Provider.findAll({
        where: {
          contacto: {
            [Op.iLike]: `%${searchContacto}%`, // Búsqueda de texto parcial
          },
        },
        order: [["contacto", order || "ASC"]],
        include: [
          { model: CategoryProvider, attributes: ["descCategory"] },
          { model: Province, attributes: ["descProvince"] },
        ],
      });
    } else if (filterCategory) {
      data = await Provider.findAll({
        where: {
          idCategory: filterCategory,
        },
        order: [["razonsocial", order || "ASC"]],
        include: [
          { model: CategoryProvider, attributes: ["descCategory"] },
          { model: Province, attributes: ["descProvince"] },
        ],
      });
    } else {
      data = await Provider.findAll({
        order: [["razonsocial", order || "ASC"]],
        include: [
          { model: CategoryProvider, attributes: ["descCategory"] , through: { attributes: [] }},
          { model: Province, attributes: ["descProvince"]},
        ],
      });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los Proveedores" });
  }
};

export default getProvider;
