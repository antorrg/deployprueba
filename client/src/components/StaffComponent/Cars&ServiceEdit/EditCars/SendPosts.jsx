import axios from "axios";
import {HandlError,showSuccess, showError } from '../../../Auth/HandlerError';
import setAuthHeader from '../../../Auth/axiosUtils'



const postCar = async(carData)=>{
  const patent = carData.patent;
  const mark = carData.mark;
  const model = carData.model;
  const year = carData.year;
  const motorNum = carData.motorNum;
  const chassisNum = carData.chassisNum;
  const observations = carData.observations;
  const picture = carData.picture;
  const idUser = carData.idUser;
  try {
    const response = await axios.post(`/car`, {
        patent,
        mark,
        model,
        year,
        motorNum,
        chassisNum,
        observations,
        picture,
        idUser,
    }, setAuthHeader())
    if (response.status === 201) {
      const car = response.data.data;
       showSuccess('Vehiculo creado exitosamente')
       sessionStorage.clear()
        return car;
      }
  } catch (error) {
    showError('Creación de vehiculo fallida')
    HandlError(error);
    throw error;
  }
}
const postService = async(serviceData)=>{
    const email = userData.email;
    const password = userData.password;
    try {
        const response = await axios.post(`/user/login`,{
            email,
            password,
        }, setAuthHeader());
        if (response.status === 201) {
          const service = response.data.data;
        showSuccess('Servicio creado exitosamente')   
        return service;
        }
       
        } catch (error) {
          showError('Creación de servicio fallida')
          //HandlError(error);
          throw error;
        }    
  }


export {
    postCar,
    postService
}

