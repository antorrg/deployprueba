import { Router } from "express";
import ps from "../Handlers/postHandler/index.js";
import m from "../Utils/middleIds.js";

const postRouter = Router();

//!Rutas para las Categorías de Post
//todas las rutas GET, POST... para el post o tips
postRouter.get("/categorypost", ps.getCategoryPost); //todas las categorías de Tips/post ordenadas alfabéticamente
postRouter.post("/categorypost", ps.postCategoryPost); //crea una nueva categoría, la recibe por body como {nameCategoryPost:"name"}
postRouter.delete("/categorypost/:idCategoryPost", m.middIntId,  ps.deleteCategoryPost); //elimina una categoría que no esté asociada a un Post, la recibe como idCategoryPost por params
postRouter.patch("/categorypost/:idCategoryPost", m.middIntId, ps.updateCategoryPost); //actualiza una categoría de post, recibe idCategoryPost por params y el nuevo nombre por body como {nameCategoryPost}

//!Rutas para los Post
postRouter.get("/allpostorderfecha", ps.getPostAllOrderFecha); // todos los Post ordenados por fecha. Recibe por query el orden ASC o DESC http://localhost:3001/allpostorderfecha?order=ASC
postRouter.get("/allpostordertitle", ps.getPostAllOrderTitle); // todos los Post ordenados por title. Recibe por query el orden ASC o DESC http://localhost:3001/allpostordertitle?order=ASC
postRouter.get("/postfav", ps.getPostFav); //puede recibir query http://localhost:3001/postfav?total=1
postRouter.get("/post/:idPost", ps.getPostByidPost); //devuelve un post según idPost
postRouter.get("/postpublish", ps.getPostPublish); //devuelve los post publicados o no de acuerdo a lo que se pide por query http://localhost:3001/postpublish?value=true&columnorder=datePost&order=DESC (ver detalles en elhandler)
postRouter.get("/postbycategory/:idCategory", m.middIntId, ps.getPostByCategory); //devuelve los post por categoría de acuerdo a lo que se pide por query http://localhost:3001/postbycategory/1?columnorder=datePost&order=DESC (ver detalles en elhandler)
postRouter.post("/post", ps.postPost); //crear un post/tips
postRouter.delete("/post/:id", m.middIntId,  ps.deletePost); //eliminar un post por idPost
postRouter.patch("/post/:id", m.middIntId,  ps.updatePost); //actualiza datos de un Post, según idPost. Enviar todo lo demás que se tenga que modificar por body, por ejemplo {titlePost: "Nuevo título", idCategory: 2}
postRouter.get("/postOrder", ps.getOrderPosts);//devuelve los tips filtrados por categoria y ordenados por fecha o por nombre;

export default postRouter;
