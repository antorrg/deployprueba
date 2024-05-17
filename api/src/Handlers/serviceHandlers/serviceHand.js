import serv from '../../Controllers/serviceControllers/index.js'

export default {

 createServiceHand : async (req, res)=>{
    const {type, detail, date_in, date_out, observations, picture, carId}= req.body;
    try {
       const response = await serv.createService(type, detail, date_in, date_out, observations, picture, carId)
       res.status(201).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},
//=====================================================

 getServiceHand : async (req, res)=>{
    const {search}=req.query;
    try {
        if(search){
            const response = await serv.getServiceByQuery(search)
            res.status(200).json(response) 
        }else{
       const response = await serv.getService()
       res.status(200).json(response) 
       }
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},

//================================================================


 getServiceIdHand : async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await serv.serviceById(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},

//=====================================================================

 updateServiceHand : async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
    try {
       const response = await serv.updateService(id, newData)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},


//==============================================================

 delServiceHand : async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await serv.deleteService(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
},
};
