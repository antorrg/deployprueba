import { Router } from "express";
import catProv from '../Handlers/providerHandler/index.js';
import m from '../Utils/middleIds.js';

const providerRoutes = Router();

//todas las rutas GET, POST... para Proveedores y sus categorías:

//!Rutas para las Categorías de Provider:
providerRoutes.post("/catprovider", catProv.postCategoryProvider); //crea una categoría para Proveedores, devuelve todas las categorías ordenadas según query http://localhost:3001/postcategoryprovider?order=DESC
providerRoutes.get("/catprovider", catProv.getCategoryProvider); //todas las categorías de proveedores, puede recibir query para ordenar por descCategory. http://localhost:3001/categoryprovider?order=DESC
providerRoutes.get("/catprovider/:id", m.middIntId, catProv.getCategoryProviderById); //categoría de proveedores según id
providerRoutes.patch("/catprovider/:id", m.middIntId, catProv.updateCategoryProvider); //actualiza nombre de categoría. Recibe el id por params, order por query (devuelve todas las categorias) y nameCategoryProvider por body. http://localhost:3001/updatecategoryprovider/4?order=DESC
providerRoutes.delete("/catprovider/:id", m.middIntId, catProv.deleteCategoryProvider); //ídem PATCH pero sin body


//!Rutas para los Provider (Proveedores):
providerRoutes.get("/providers", catProv.getProvider); //pueden usarse queries, ver en el handler
providerRoutes.get("/providers/:id", m.middIntId, catProv.getProviderById); //proveedor por id  http://localhost:3001/providerbyid/2
providerRoutes.post("/providers",  catProv.postProvider); //crea un proveedor y lo devuelve
providerRoutes.delete("/providers/:id", m.middIntId, catProv.deleteProvider); //elimina un proveedor y devuelve todos los restantes
providerRoutes.put("/providers/:id", m.middIntId,catProv.updateProvider); //actualiza un proveedor y lo devuelve

export default providerRoutes;