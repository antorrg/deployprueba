import { Province } from "../../db.js";

const getProvinces = async (req, res) => {
  try {
    const data = await Province.findAll();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: "Error al solicitar las provincias" });
  }
};

export default getProvinces;
