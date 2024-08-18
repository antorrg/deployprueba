import { catchError } from '../Utils/errors/errorsHandlers.js';
import serv from '../Controllers/serviceFunctions.js'

export default {

 createServiceHand : catchError(async (req, res)=>{
    const {type, detail, date_in, date_out, observations, picture, carId}= req.body;
       const response = await serv.createService(type, detail, date_in, date_out, observations, picture, carId)
       res.status(201).json(response) 
    
}),
//=====================================================

 getServiceHand : catchError(async (req, res)=>{
    const {search}=req.query;
        if(search){
            const response = await serv.getServiceByQuery(search)
            res.status(200).json(response) 
        }else{
       const response = await serv.getService()
       res.status(200).json(response) 
       }
}),

//================================================================

 getServiceIdHand : catchError(async (req, res)=>{
    const {id} = req.params;
       const response = await serv.serviceById(id)
       res.status(200).json(response) 
   
}),

//=====================================================================

 updateServiceHand : catchError(async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
       const response = await serv.updateService(id, newData)
       res.status(200).json(response) 
   
}),

//==============================================================

 delServiceHand : catchError(async (req, res)=>{
    const {id} = req.params;
       const response = await serv.deleteService(id)
       res.status(200).json(response) 
   
}),
};
