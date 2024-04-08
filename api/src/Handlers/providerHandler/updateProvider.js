import { CategoryProvider, Provider, Province } from "../../db.js";

const updateProvider = async (req, res) => {
  const { idProvider } = req.params;
  const updateData = req.body;
  const { idCategory, idProvince } = req.body;

  //verificar si recibe idProvider
  if (!idProvider) {
    return res
      .status(400)
      .json({ error: "Se requiere id del Proveedor a modificar" });
  }

  try {
    //verificar si el Provider por id existe
    const providerSelected = await Provider.findByPk(idProvider);
    if (!providerSelected) {
      return res.status(400).json({ error: "Proveedor no encontrado" });
    }
    //si se debe actualizar idCategory, verificar que exista
    if (idCategory) {
      const existCategory = await CategoryProvider.findByPk(idCategory);
      if (!existCategory) {
        return res
          .status(400)
          .json({ error: "Categoría de Proveedor inexistente" });
      }
    }
    //si se debe actualizar idProvince, verificar que exista
    if (idProvince) {
      const existProvince = await Province.findByPk(idProvince);
      if (!existProvince) {
        return res.status(400).json({ error: "Provincia inexistente" });
      }
    }

    // Actualizar el Proveedor con los datos proporcionados
    await providerSelected.update(updateData);

    // Devolver los datos actualizados del Proveedor
    const data = await Provider.findOne({
      where: { id: idProvider },
      include: [
        { model: CategoryProvider, attributes: ["descCategory"] },
        { model: Province, attributes: ["descProvince"] },
      ],
    });

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el proveedor" });
  }
};

export default updateProvider;
