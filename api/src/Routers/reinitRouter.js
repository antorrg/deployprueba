import { Router } from "express";
import reinit from "../Handlers/reinitHandler/reinit.js";

const reinitRouter = Router();

//todas las rutas para el reinicio con reinit
reinitRouter.get("/reinit", reinit);

export default reinitRouter;