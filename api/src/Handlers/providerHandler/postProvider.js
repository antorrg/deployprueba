import { Provider, CategoryProvider, Province, sequelize } from "../../db.js";
import { Op } from "sequelize";

const postProvider = async (req, res) => {
  const {
    razonsocial,
    fantasia,
    contacto,
    direccion,
    ciudad,
    telefono,
    email,
    otro,
    img,
    idProvince,
    idCategory,
  } = req.body;

  if (
    !razonsocial ||
    !fantasia ||
    !direccion ||
    !ciudad ||
    !telefono ||
    !idProvince
  ) {
    return res.status(400).json({ error: "Faltan datos para el Proveedor" });
  }

  try {
    // Convertir razonsocial a minúsculas antes de realizar la búsqueda
    const razonsocialLowerCase = sequelize.fn("LOWER", razonsocial);

    // Verificar si ya existe otro proveedor con la misma razonsocial
    const existingProvider = await Provider.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("razonsocial")),
        Op.iLike,
        razonsocialLowerCase
      ),
    });

    // Si ya existe, devolver un error
    if (existingProvider) {
      return res
        .status(400)
        .json({ error: "Existe un Proveedor con la misma razón social" });
    }

    //verificar si el idCategory existe en las Categorias, y si no devolver error
    const categorySelected = await CategoryProvider.findByPk(idCategory);
    if (!categorySelected) {
      return res.status(400).json({ error: "No existe la Categoría" });
    }

    //verificar si el idProvince existe en las Provincias, y si no devolver error
    const provinceSelected = await Province.findByPk(idProvince);
    if (!provinceSelected) {
      return res.status(400).json({ error: "No existe la Provincia" });
    }
    //! Crear el post (ver las imagenes a guardar)

    const createdProvider = await Provider.create({
      razonsocial,
      fantasia,
      contacto: contacto || "",
      direccion,
      ciudad,
      telefono,
      email: email || "",
      otro: otro || "",
      img: img || "",
      idProvince,
      idCategory: idCategory || 1,
    });

    //devolvemos SOLO el Proveedor creado, para reordenarlos usar método GET correspondiente
    const data = await Provider.findOne({
      where: { id: createdProvider.id },
      include: [
        { model: CategoryProvider, attributes: ["descCategory"] },
        { model: Province, attributes: ["descProvince"] },
      ],
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el Proveedor" });
  }
};

export default postProvider;
