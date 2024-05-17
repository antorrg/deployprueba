import  car from '../../Controllers/carControllers/index.js'


const delCarHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await car.deleteCar(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(error.status).json({error:error.message})
    }
}

export default delCarHand;