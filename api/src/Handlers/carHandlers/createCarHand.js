import {createCar}from '../../Controllers/carControllers/index.js'

const createCarHand = async (req, res)=>{
    const {idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture}= req.body;
    try {
       const response = await createCar(idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture)
       res.status(201).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

export default createCarHand;