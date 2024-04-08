import { Commerce, Province, sequelize } from "../../db.js";
import { Op } from "sequelize";

const postCommerce = async (req, res) => {
  const {
    razonsocial,
    fantasia,
    direccion,
    ciudad,
    telefono,
    celular,
    instagram,
    facebook,
    email,
    otro,
    idProvince,
  } = req.body;

  if (
    !razonsocial ||
    !fantasia ||
    !direccion ||
    !ciudad ||
    !telefono ||
    !idProvince
  ) {
    return res.status(400).json({ error: "Faltan datos para el Comercio" });
  }

  try {
    // Convertir razonsocial a minúsculas antes de realizar la búsqueda
    const razonsocialLowerCase = sequelize.fn("LOWER", razonsocial);

    // Verificar si ya existe otro Comercio con la misma razonsocial
    const existingCommerce = await Commerce.findOne({
      where: sequelize.where(
        sequelize.fn("LOWER", sequelize.col("razonsocial")),
        Op.iLike,
        razonsocialLowerCase
      ),
    });

    // Si ya existe, devolver un error
    if (existingCommerce) {
      return res
        .status(400)
        .json({ error: "Existe un Comercio con la misma razón social" });
    }

    //verificar si el idProvince existe en las Provincias, y si no devolver error
    const provinceSelected = await Province.findByPk(idProvince);
    if (!provinceSelected) {
      return res.status(400).json({ error: "No existe la Provincia" });
    }
    //! Crear el post, isMyCommerce se marcará como true
    const createdCommerce = await Commerce.create({
      razonsocial,
      fantasia,
      direccion,
      ciudad,
      telefono,
      celular: celular || "",
      email: email || "",
      otro: otro || "",
      instagram: instagram || "",
      facebook: facebook || "",
      idProvince,
      isMyCommerce: true,
    });

    //!los demás comercios creados si los hay, se marcarán como isMyCommerce = false
    await Commerce.update(
      { isMyCommerce: false },
      {
        where: {
          id: {
            [Op.ne]: createdCommerce.id, // Excluir el registro creado recientemente
          },
        },
      }
    );

    //devolvemos SOLO el Comercio creado
    const data = await Commerce.findOne({
      where: { id: createdCommerce.id },
      include: [{ model: Province, attributes: ["descProvince"] }],
    });
    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el Comercio" });
  }
};

export default postCommerce;
