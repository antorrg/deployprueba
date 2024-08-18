import { catchError } from "../Utils/errors/errorsHandlers.js";
import car from '../Controllers/carServices.js'

export default {

createCarHand : catchError( async (req, res)=>{
    const {idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture}= req.body;
    const response = await car.createCar(idUser, patent, mark, model, year, motorNum, chassisNum, observations, picture)
    res.status(201).json(response)
}),
//* Controladores de busqueda:
getCarHand : catchError( async (req, res)=>{
    const {patent}= req.query;
        if(patent){
            const response = await car.getByQuery(patent);
            res.status(200).json(response);
        }else{
         const response = await car.getCar();
         res.status(200).json(response); 
        }
}),
getCarByIdHand : catchError( async (req, res)=>{
    const {id} = req.params;
       const response = await car.carById(id)
       res.status(200).json(response) 
}),
//* Controladores de actualizacion:_________________________

updateCarHand : catchError(async (req, res)=>{
    const {id} = req.params;
    const newData = req.body;
       const response = await car.updateCar(id, newData)
       res.status(200).json(response) 
}),

updDomCarHand : async (req, res) => {
    const {id}= req.params;
    const body = req.body;
        const response = await car.updateDomCar(id, body)
        res.status(200).json(response) 
},
//* Controlador de borrado (logico)==============================

delCarHand : catchError( async (req, res)=>{
    const {id} = req.params;
       const response = await car.deleteCar(id)
       res.status(200).json(response) 
}),
}