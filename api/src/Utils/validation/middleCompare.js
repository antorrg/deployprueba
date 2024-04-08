const middleCompare = async (req, res, next)=>{
    const{id, password}= req.body;

    if(!id){return res.status(400).json({error: "missing id"})};

    if(!password){return res.status(400).json({error: "missing password"})};
    
    next();
}

export default middleCompare;