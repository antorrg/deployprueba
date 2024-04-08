import {createCar, updateCar, deleteCar}from '../../Controllers/carControllers/contCar.js'
import {getCar, getByQuery, carById}from '../../Controllers/carControllers/getCar.js'


const createCarHand = async (req, res)=>{
    const {idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture}= req.body;
    try {
       const response = await createCar(idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture)
       res.status(201).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

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

const updateCarHand = async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
    try {
       const response = await updateCar(id, newData)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

const delCarHand = async (req, res)=>{
    const {id} = req.params;
    try {
       const response = await deleteCar(id)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}


export {
    createCarHand, 
    getCarHand, 
    getCarByIdHand, 
    updateCarHand, 
    delCarHand 
};