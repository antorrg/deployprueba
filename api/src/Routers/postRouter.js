import { Router } from "express";
import getCategoryPost from "../Handlers/postHandler/getCategoryPost.js";
import postCategoryPost from "../Handlers/postHandler/postCategoryPost.js";
import deleteCategoryPost from "../Handlers/postHandler/deleteCategoryPost.js";
import updateCategoryPost from "../Handlers/postHandler/updateCategoryPost.js";
import getPostAllOrderFecha from "../Handlers/postHandler/getPostAllOrderFecha.js";
import getPostAllOrderTitle from "../Handlers/postHandler/getPostAllOrderTitle.js";
import getPostFav from "../Handlers/postHandler/getPostFav.js";
import getPostByidPost from "../Handlers/postHandler/getPostByidPost.js";
import getPostPublish from "../Handlers/postHandler/getPostPublish.js";

import postPost from "../Handlers/postHandler/postPost.js";
import deletePost from "../Handlers/postHandler/deletePost.js";
import updatePost from "../Handlers/postHandler/updatePost.js";
import getPostByCategory from "../Handlers/postHandler/getPostByCategory.js";
const postRouter = Router();

//!Rutas para las Categorías de Post
//todas las rutas GET, POST... para el post o tips
postRouter.get("/categorypost", getCategoryPost); //todas las categorías de Tips/post ordenadas alfabéticamente
postRouter.post("/categorypost", postCategoryPost); //crea una nueva categoría, la recibe por body como {nameCategoryPost:"name"}
postRouter.delete("/categorypost/:idCategoryPost", deleteCategoryPost); //elimina una categoría que no esté asociada a un Post, la recibe como idCategoryPost por params
postRouter.patch("/categorypost/:idCategoryPost", updateCategoryPost); //actualiza una categoría de post, recibe idCategoryPost por params y el nuevo nombre por body como {nameCategoryPost}

//!Rutas para los Post
postRouter.get("/allpostorderfecha", getPostAllOrderFecha); // todos los Post ordenados por fecha. Recibe por query el orden ASC o DESC http://localhost:3001/allpostorderfecha?order=ASC
postRouter.get("/allpostordertitle", getPostAllOrderTitle); // todos los Post ordenados por title. Recibe por query el orden ASC o DESC http://localhost:3001/allpostordertitle?order=ASC
postRouter.get("/postfav", getPostFav); //puede recibir query http://localhost:3001/postfav?total=1
postRouter.get("/post/:id", getPostByidPost); //devuelve un post según idPost
postRouter.get("/postpublish", getPostPublish); //devuelve los post publicados o no de acuerdo a lo que se pide por query http://localhost:3001/postpublish?value=true&columnorder=datePost&order=DESC (ver detalles en elhandler)
postRouter.get("/post/:idCategory", getPostByCategory); //devuelve los post por categoría de acuerdo a lo que se pide por query http://localhost:3001/postbycategory/1?columnorder=datePost&order=DESC (ver detalles en elhandler)
postRouter.post("/post", postPost); //crear un post/tips
postRouter.delete("/post/:id", deletePost); //eliminar un post por idPost
postRouter.patch("/post/:id", updatePost); //actualiza datos de un Post, según idPost. Enviar todo lo demás que se tenga que modificar por body, por ejemplo {titlePost: "Nuevo título", idCategory: 2}
export default postRouter;
