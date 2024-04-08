import { Router } from "express";
import getCategoryProvider from "../Handlers/providerHandler/getCategoryProvider.js";
import getCategoryProviderById from "../Handlers/providerHandler/getCategoryProviderById.js";
import postCategoryProvider from "../Handlers/providerHandler/postCategoryProvider.js";
import updateCategoryProvider from "../Handlers/providerHandler/updateCategoryProvider.js";
import deleteCategoryProvider from "../Handlers/providerHandler/deleteCategoryProvider.js";
import getProvider from "../Handlers/providerHandler/getProvider.js";
import getProviderById from "../Handlers/providerHandler/getProviderById.js";
import postProvider from "../Handlers/providerHandler/postProvider.js";
import deleteProvider from "../Handlers/providerHandler/deleteProvider.js";
import updateProvider from "../Handlers/providerHandler/updateProvider.js";

const providerRoutes = Router();

//todas las rutas GET, POST... para Proveedores y sus categorías

//!Rutas para las Categorías de Provider
providerRoutes.post("/catprovider", postCategoryProvider); //crea una categoría para Proveedores, devuelve todas las categorías ordenadas según query http://localhost:3001/postcategoryprovider?order=DESC
providerRoutes.get("/catprovider", getCategoryProvider); //todas las categorías de proveedores, puede recibir query para ordenar por descCategory. http://localhost:3001/categoryprovider?order=DESC
providerRoutes.get("/catprovider/:id", getCategoryProviderById); //categoría de proveedores según id
providerRoutes.patch("/catprovider/:id", updateCategoryProvider); //actualiza nombre de categoría. Recibe el id por params, order por query (devuelve todas las categorias) y nameCategoryProvider por body. http://localhost:3001/updatecategoryprovider/4?order=DESC
providerRoutes.delete("/catprovider/:id", deleteCategoryProvider); //ídem PATCH pero sin body

//!Rutas para los Provider (Proveedores)
providerRoutes.get("/providers", getProvider); //pueden usarse queries, ver en el handler
providerRoutes.get("/providers/:id", getProviderById); //proveedor por id  http://localhost:3001/providerbyid/2
providerRoutes.post("/providers", postProvider); //crea un proveedor y lo devuelve
providerRoutes.delete("/providers/:id", deleteProvider); //elimina un proveedor y devuelve todos los restantes
providerRoutes.patch("/providers/:id", updateProvider); //actualiza un proveedor y lo devuelve
export default providerRoutes;
