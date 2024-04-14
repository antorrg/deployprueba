import axios from "axios";
import {HandlError,showSuccess, showError } from '../../../Auth/HandlerError';
import setAuthHeader from "../../../Auth/axiosUtils";


const postService = async(input, closServ)=>{
  console.log(input)
    const type = input.type;
    const detail = input.detail;
    const date_in = input.date_in;
    const date_out = input.date_out;
    const observations = input.observations;
    const carId = input.CarId;
  try {
      const response = await axios.post(`/service`,{
          type,
          detail,
          date_in,
          date_out,
          observations,
          carId,
      }, setAuthHeader()) 
      if (response.status === 201) {
        const service = response.data.data;
      showSuccess('Servicio creado exitosamente')  
      sessionStorage.clear()
      closServ() 
      return service;
      }
     
      } catch (error) {
        showError('Creación de servicio fallida')
        //HandlError(error);
        throw error;
      }    
}


// const postpepito = async(carData)=>{
//   const patent = carData.patent;
//   const mark = carData.mark;
//   const model = carData.model;
//   const year = carData.year;
//   const motorNum = carData.motorNum;
//   const chassisNum = carData.chassisNum;
//   const observations = carData.observations;
//   const picture = carData.picture;
//   const idUser = carData.idUser;
//   try {
//     const response = await axios.post(`/car`, {
//         patent,
//         mark,
//         model,
//         year,
//         motorNum,
//         chassisNum,
//         observations,
//         picture,
//         idUser,
//     })
//     if (response.status === 201) {
//       const car = response.data.data;
//        showSuccess('Vehiculo creado exitosamente')
//        sessionStorage.clear()
//         return car;
//       }
//   } catch (error) {
//     showError('Creación de vehiculo fallida')
//     HandlError(error);
//     throw error;
//   }
// }


export default postService


