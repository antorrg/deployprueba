import { Router } from "express";
import getCategoryFather from "../Handlers/categoryHandler/getCategoryFather.js";
import getCategoryChild from "../Handlers/categoryHandler/getCategoryChild.js";

const categoryRouter = Router();

//todas las rutas GET POST ... para las categorías
categoryRouter.get("/categories/father", getCategoryFather);
categoryRouter.get("/categories/child", getCategoryChild);

export default categoryRouter;
