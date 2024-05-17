import { Commerce, Province } from "../../db.js";

const deleteCommerce = async (req, res) => {
  const { idCommerce } = req.params;


  if (!idCommerce) {
    return res.status(400).json({ error: "Se requiere id de Comercio" });
  }

  try {
    //verificar si el id Commerce existe
    const commerceToDelete = await Commerce.findByPk(idCommerce);
    if (!commerceToDelete) {
      return res.status(400).json({ error: "Comercio no encontrado" });
    }

    //Siempre debe haber un comercio en la BD, comprobar esa afirmación
    const commerces = await Commerce.findAll();

    if (commerces.length <= 1) {
      return res.status(400).json({
        error: "Debe haber al menos un comercio, no puedes eliminarlo",
      });
    }

    //si el comercio a eliminar está marcado como isMyComemrce, entonces eliminarlo y pasar el true a otro al azar
    if (commerceToDelete.isMyCommerce) {
      await commerceToDelete.destroy();
      const newCommerceActive = await Commerce.findOne();
      newCommerceActive.isMyCommerce = true;
      await newCommerceActive.save(); // Guardar los cambios en la base de datos
    } else {
      await commerceToDelete.destroy();
    }

    //una vez eliminado devuelvo todos los Comercios
    const data = await Commerce.findAll({
      order: [
        ["isMyCommerce", "ASC"],
        ["fantasia", "ASC"],
        ["direccion", "ASC"],
      ],
      include: [{ model: Province, attributes: ["descProvince"] }],
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el Comercio" });
  }
};

export default deleteCommerce;
