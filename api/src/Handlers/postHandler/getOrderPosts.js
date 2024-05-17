
import { Post, CategoryPost } from "../../db.js";

const getOrderPosts = async (req, res) => {
    let { cat, columnorder, order } = req.query;
    let value = req.query.value === undefined ? true : JSON.parse(req.query.value);
    console.log(cat+columnorder+order);
    try {
        if (cat < 1 || cat === undefined) {
            const data = await Post.findAll({
                where: { published: value },
                order: [[columnorder, order]],
                include: [{ model: CategoryPost, attributes: ["descCategory"] }],
            });
            res.status(200).json(data);
        }
        else if (cat > 0) {
            const data = await Post.findAll({
                where: { published: value, CategoryPostIdCategory: cat },
                order: [[columnorder, order]],
                include: [{ model: CategoryPost, attributes: ["descCategory"] }],
            })
            res.status(200).json(data);
        } else {
            res.status(400).json({ error: "Valor de categoría no válido" });
        }
            
        } catch (error) {
            res.status(400).json({error: "Error al obtener los Posts"})
        }
        
    }

export default getOrderPosts;
