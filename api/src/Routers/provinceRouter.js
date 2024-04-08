import { Router } from "express";
import postProvince from "../Handlers/provinceHandler/postProvince.js";
import getProvinces from "../Handlers/provinceHandler/getProvinces.js";
const provinceRouter = Router();

//todas las rutas GET, POST... para el Commerce
provinceRouter.post("/province", postProvince);
provinceRouter.get("/province", getProvinces);

export default provinceRouter;
