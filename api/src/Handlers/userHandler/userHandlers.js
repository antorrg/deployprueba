import us from '../../Controllers/userControllers/index.js'



export default {
 getUserHand : async (req, res)=>{
    const {numberId}=req.query;
    try {
        if(numberId){
            const response = await us.userByQuery(numberId)
            res.status(200).json(response)   
        }else{
            const response = await us.getUsers()
            res.status(200).json(response) 
        }
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},


 getDetailUserHand : async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await us.userById(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},

 updateUserHand : async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
    try {
       const response = await us.updateUser(id, newData)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},

 delUserHand : async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await us.deleteUser(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},
resetUserhand : async(req,res)=>{
    const {id}= req.params;
    
    try {
        const response = await us.resetPassword(id)
        res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},
}
