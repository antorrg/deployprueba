import { Router } from "express";
import getCommerce from "../Handlers/commerceHandler/getCommerce.js";
import deleteCommerce from "../Handlers/commerceHandler/deleteCommerce.js";
import postCommerce from "../Handlers/commerceHandler/postCommerce.js";
import updateCommerce from "../Handlers/commerceHandler/updateCommerce.js";

const commerceRoutes = Router();

//todas las rutas GET, POST... para el Comercio

commerceRoutes.get("/commerce", getCommerce); //devuelve todos los comercios, y si recibe query sólo devuelve el comercio activo http://localhost:3001/commerce?active=true
commerceRoutes.post("/commerce", postCommerce); //crea un comercio, lo tilda como isMyCommerce = true, y a los demás los coloca como false
commerceRoutes.delete("/commerce/:id", deleteCommerce); //se elimina el comercio sólo si luego queda al menos un comercio en la BD. SI se elimina el marcado como isMyCommerce, se pasa el valor true a otro registro aleatoriamente
commerceRoutes.patch("/commerce/:id", updateCommerce); //actualiza un Comercio, y si se modifica isMyCommerce realiza cambios en los demás comercios para mantener sólo un isMyCommerce en true

export default commerceRoutes;
