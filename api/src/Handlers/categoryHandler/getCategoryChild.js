//mostramos las subcategorias, puede recibir por query el NAME de la categoría padre para filtrar
import { Sequelize } from "sequelize";
import { Category } from "../../db.js";

const getCategoryChild = async (req, res) => {
  const { category } = req.query;

  try {
    let data;
    if (category) {
      const cat = await Category.findOne({
        where: { name: category },
      });
      console.log(cat.dataValues.idCategory);
      data = await Category.findAll({
        where: { parentId: cat.dataValues.idCategory },
        include: [
          {
            model: Category,
            as: "parentCategory",
            attributes: ["name"], // Atributos que deseas obtener de la categoría padre
          },
        ],
      });
    } else {
      data = await Category.findAll({
        where: { parentId: { [Sequelize.Op.not]: null } },
        include: [
          {
            model: Category,
            as: "parentCategory",
            attributes: ["name"], // Atributos que deseas obtener de la categoría padre
          },
        ],
      });
    }
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener las subcategorías" });
  }
};

export default getCategoryChild;
