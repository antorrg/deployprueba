import {deleteCar}from '../../Controllers/carControllers/index.js'

const delCarHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await deleteCar(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export default delCarHand;