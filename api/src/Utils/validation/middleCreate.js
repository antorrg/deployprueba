import bcrypt from 'bcrypt';

const middleCreate = async (req, res, next)=>{
    const{email, name, typeId, numberId, country}= req.body;
    // Validar si existe el email y su formato usando una expresión regular
    if(!email){return res.status(400).json({error: "missing email"})};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {return res.status(400).json({ error: "invalid email format" });}

    if(!name){return res.status(400).json({error: "missing name"})};
    if(!typeId){return res.status(400).json({error: "missing user identification"})};
    if(!numberId){return res.status(400).json({error: "missing user identification"})};
    if(!country){return res.status(400).json({error: "missing country"})};
   
    next();
}

export default middleCreate;