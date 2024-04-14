import { where, Op } from "sequelize";
import { Commerce, Province } from "../../db.js";

const updateCommerce = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;
  const { idProvince, isMyCommerce } = req.body;

  console.log("aca");
  console.log(updateData);
  //verificar si recibe id
  if (!id) {
    return res
      .status(400)
      .json({ error: "Se requiere id del Comercio a modificar" });
  }

  try {
    //verificar si el Comercio por id existe
    const commerceSelected = await Commerce.findByPk(id);
    if (!commerceSelected) {
      return res.status(400).json({ error: "Comercio no encontrado" });
    }

    //si se debe actualizar idProvince, verificar que exista
    if (idProvince) {
      const existProvince = await Province.findByPk(idProvince);
      if (!existProvince) {
        return res.status(400).json({ error: "Provincia inexistente" });
      }
    }

    // Actualizar el Comercio con los datos proporcionados
    await commerceSelected.update(updateData);

    //!si se actualizó isMyCommerce, actualizar los demás a true/false
    // Convertir isMyCommerce a booleano si está definido
    let isMyCommerceBoolean;
    if (isMyCommerce !== undefined) {
      isMyCommerceBoolean = isMyCommerce === "true";
    }

    // Verificar si isMyCommerce es falso
    if (isMyCommerceBoolean === false) {
      //tildar como true uno de los demás al azar
      const changeActive = await Commerce.findOne({
        where: { isMyCommerce: false },
      });
      if (changeActive) {
        changeActive.isMyCommerce = true;
        await changeActive.save();
      }
    }
    if (isMyCommerceBoolean === true) {
      //tildar como false los demás comercios
      await Commerce.update(
        { isMyCommerce: false },
        {
          where: {
            id: {
              [Op.ne]: commerceSelected.id, // Excluir el registro creado recientemente
            },
          },
        }
      );
    }

    // Devolver los datos actualizados del Comercio
    const data = await Commerce.findOne({
      where: { id: id },
      include: [{ model: Province, attributes: ["descProvince"] }],
    });

    res.status(201).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el Comercio" });
  }
};

export default updateCommerce;
