import { Commerce, Province } from "../../db.js";
import { emptyResCommerce} from '../../Utils/emptyRes.js'

const getCommerce = async (req, res) => {
  const { active } = req.query;

  let data;

  try {
    if (active) {
      //devuelve sólo el comercio activo, es decir el que se usa para mostrar datos en footer o Contacto
      data = await Commerce.findAll({
        where: { isMyCommerce: true },
        order: [
          ["isMyCommerce", "ASC"],
          ["fantasia", "ASC"],
          ["direccion", "ASC"],
        ], include: [{ model: Province, attributes: ["descProvince"] }],
      });
    } else {
      //devuelve todos los comercios
      data = await Commerce.findAll({
        order: [
          ["isMyCommerce", "DESC"],
          ["fantasia", "ASC"],
          ["direccion", "ASC"],
        ], include: [
           { 
           model: Province, 
           attributes: ["descProvince"]}],
      });
    }
   if(data.length===0){return res.status(200).json(emptyResCommerce())}
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al obtener los Comercios" });
  }
};

export default getCommerce;
