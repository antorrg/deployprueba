import car from '../../Controllers/carControllers/index.js'



const getCarHand = async (req, res)=>{
    const {patent}= req.query;
    try {
        if(patent){
            const response = await car.getByQuery(patent);
            res.status(200).json(response);
        }else{
         const response = await car.getCar();
         res.status(200).json(response); 
        }
       
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}
const getCarByIdHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await car.carById(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}


export {
    getCarHand, 
    getCarByIdHand
};