import { Province } from "../../db.js";

const postProvince = async (req, res) => {
  try {
    // Array con todas las provincias de Argentina
    const provincesArray = [
      { descProvince: "Buenos Aires" },
      { descProvince: "CABA" },
      { descProvince: "Catamarca" },
      { descProvince: "Chaco" },
      { descProvince: "Chubut" },
      { descProvince: "Córdoba" },
      { descProvince: "Corrientes" },
      { descProvince: "Entre Ríos" },
      { descProvince: "Formosa" },
      { descProvince: "Jujuy" },
      { descProvince: "La Pampa" },
      { descProvince: "La Rioja" },
      { descProvince: "Mendoza" },
      { descProvince: "Misiones" },
      { descProvince: "Neuquén" },
      { descProvince: "Río Negro" },
      { descProvince: "Salta" },
      { descProvince: "San Juan" },
      { descProvince: "San Luis" },
      { descProvince: "Santa Cruz" },
      { descProvince: "Santa Fe" },
      { descProvince: "Santiago del Estero" },
      { descProvince: "Tierra del Fuego" },
      { descProvince: "Tucumán" },
    ];

    // Utiliza bulkCreate para insertar las provincias en la base de datos
    const createdProvinces = await Province.bulkCreate(provincesArray);

    res.status(201).json(createdProvinces);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear las provincias" });
  }
};

export default postProvince;
