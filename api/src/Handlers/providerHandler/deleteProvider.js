import { CategoryProvider, Provider, Province } from "../../db.js";

const deleteProvider = async (req, res) => {
  const { id } = req.params;
  const { order } = req.query;

  if (!id) {
    return res.status(400).json({ error: "Se requiere id de Proveedor" });
  }

  try {
    //verificar si el id Provider existe
    const providerToDelete = await Provider.findByPk(id);
    if (!providerToDelete) {
      return res.status(400).json({ error: "Proveedor no encontrado" });
    }

    await providerToDelete.destroy();
    //una vez eliminada devuelvo todos los Provider
    const data = await Provider.findAll({
      order: [["razonsocial", order || "ASC"]],
      include: [
        { model: CategoryProvider, attributes: ["descCategory"] },
        { model: Province, attributes: ["descProvince"] },
      ],
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el proveedor" });
  }
};

export default deleteProvider;
