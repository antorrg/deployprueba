import {createService, getService, getServiceByQuery, serviceById, updateService, deleteService} from '../../Controllers/serviceControllers/index.js'

const createServiceHand = async (req, res)=>{
    const {type, detail, date_in, date_out, observations, picture, carId}= req.body;
    try {
       const response = await createService(type, detail, date_in, date_out, observations, picture, carId)
       res.status(201).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};
//=====================================================

const getServiceHand = async (req, res)=>{
    const {search}=req.query;
    try {
        if(search){
            const response = await getServiceByQuery(search)
            res.status(200).json(response) 
        }else{
       const response = await getService()
       res.status(200).json(response) 
       }
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//================================================================


const getServiceIdHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await serviceById(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//=====================================================================

const updateServiceHand = async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
    try {
       const response = await updateService(id, newData)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

//==============================================================

const delServiceHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await deleteService(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};


export { 
    createServiceHand, 
    getServiceHand, 
    getServiceIdHand, 
    updateServiceHand, 
    delServiceHand, 
  
};
