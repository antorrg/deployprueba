import { Router } from "express";
import com from "../Handlers/commerceHandler/index.js";
import m from "../Utils/middleIds.js";


const commerceRoutes = Router();

//todas las rutas GET, POST... para el Comercio

commerceRoutes.get("/commerce", com.getCommerce); //devuelve todos los comercios, y si recibe query sólo devuelve el comercio activo http://localhost:3001/commerce?active=true
commerceRoutes.post("/commerce", com.postCommerce); //crea un comercio, lo tilda como isMyCommerce = true, y a los demás los coloca como false
commerceRoutes.delete("/commerce/:id", m.middIntId, com.deleteCommerce); //se elimina el comercio sólo si luego queda al menos un comercio en la BD. SI se elimina el marcado como isMyCommerce, se pasa el valor true a otro registro aleatoriamente
commerceRoutes.patch("/commerce/:id", m.middIntId, com.updateCommerce); //actualiza un Comercio, y si se modifica isMyCommerce realiza cambios en los demás comercios para mantener sólo un isMyCommerce en true

export default commerceRoutes;
