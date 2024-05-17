import us from '../../Controllers/userControllers/index.js'


export default {
 userLogHand : async (req, res)=>{
    const {email, password}=req.body;
    try {
       const response = await us.userLogin(email, password)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},

 userCreateHand : async (req, res)=>{
    const {email, name, typeId, numberId, country}=req.body;
    try {
       const response = await us.userCreate(email, name, typeId, numberId, country)
       res.status(201).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},

 userPassHand : async (req, res)=>{
    const {id, password}= req.body;
    try {
        const response = await us.compare(id, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
},

}