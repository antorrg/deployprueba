import {getCar, getByQuery, carById}from '../../Controllers/carControllers/index.js'


const getCarHand = async (req, res)=>{
    const {patent}= req.query;
    try {
        if(patent){
            const response = await getByQuery(patent);
            res.status(200).json(response);
        }else{
         const response = await getCar();
         res.status(200).json(response); 
        }
       
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}
const getCarByIdHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await carById(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


export {
    getCarHand, 
    getCarByIdHand
};