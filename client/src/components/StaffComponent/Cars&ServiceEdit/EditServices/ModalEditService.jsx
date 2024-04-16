import { useState } from 'react';
import style from '../../generalStyles/ModalsForms/Modal.module.css'
import axios from 'axios'
import GenericButton from '../Buttons/GenericButton';
import {showError, showSuccess,HandlError}from '../../Auth/HandlerError';


const ModalEditCar = ({ onClose, userEdit}) => {
  const {patente, mark, model, year, motorNum, chassisNum, observations,picture, enable, deletedAt,idUser}= userEdit;
 
  const [editedCar, setEditedCar] = useState({
    patente,
    mark,
    model,
    year,
    motorNum,
    chassisNum,
    observations,
    picture,
    enable,
    deletedAt,
    idUser
  });



  const handleInputChange = (name, value) => {
    const processedValue = name === 'enable' ? value === 'true' : value;
    setEditedCar((prevCar) => ({
      ...prevCar,
      [name]: processedValue,
    }));
  };

  const handleSaveChanges = async () => {
  
    //Lógica para guardar los cambios
    try {
      // Realiza la solicitud PUT con Axios
      const response = await axios.put(`/car/${id}`,editedCar);
      
      if (response.status === 200) {
        showSuccess('Vehiculo actualizado con éxito')
        
       onClose(); // Cierra el modal después de guardar los cambios
      } else {
        showError('Error al actualizar el vehiculo')
      
      }
    } catch (error) {
      HandlError({error:error.message})
      console.error('Error al actualizar el vehiculo:', error);
    
    }
  };
  
 

  return (
    <div className={style.modal}>
      <h2>Editar Vehiculo</h2>
      <FormEditCar id = {id} editedUser={editedUser} onInputChange={handleInputChange} onSaveChanges={handleSaveChanges} />
      <GenericButton onClick= {onClose} buttonText='Cancelar'/>
    </div>
  );
};

export default ModalEditCar;
