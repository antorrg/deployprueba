import { useState } from 'react';
import style from '../../generalStyles/ModalsForms/Modal.module.css'
import FormEditCar from './FormEditCar';
import ChangeUser from './ChangeUser';
import deleteCar from './DeleteCar'
import axios from 'axios'
import GenericButton from '../../../GenericButton/GenericButton';
import {showError, showSuccess,HandlError}from '../../../Auth/HandlerError';
import showConfirmationDialog from '../../../utils/sweetAlert'
import setAuthHeader from '../../../Auth/axiosUtils'
import {Edition} from '../../Index'


const ModalEditCar = ({ onClose, carEdit}) => {
  const {id, patent, mark, model, year, motorNum, chassisNum, observations,picture, enable, deletedAt,idUser}= carEdit;
 const [changeOwner, setChangeOwner]= useState(false)
  const [editedCar, setEditedCar] = useState({
    patent,
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
      const response = await axios.put(`/car/${id}`,editedCar, setAuthHeader());
      
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
  const delCarHandle = async() => {
      const confirmed = await showConfirmationDialog(`¿Está seguro de eliminar el vehiculo? \n Esta accion no podrá deshacerse`);
      if (confirmed) {
          // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
          deleteCar(id, onClose)
      }
    };


 const ownerChange = () => {
  setChangeOwner(true) 
 }
 const notOwnerChange = () => {
  setChangeOwner(false) 
 }
 
  return (
    <div className={style.modal}>
      <div className={style.divButtons}>
      <GenericButton onClick= {onClose} buttonText='Cancelar'/>
      {changeOwner? 
      <GenericButton onClick= {notOwnerChange} buttonText='Editar Vehiculo'/>:
      <><Edition allowedRoles={[0]} onClick={ownerChange} text={'Cambiar Propietario'}/>
      <Edition allowedRoles={[0]} onClick={delCarHandle} text={'Eliminar Vehiculo'}/></>
      }
      </div>
      {changeOwner? 
      <ChangeUser carEdit={id} onClose={onClose}/> :
      <FormEditCar id = {id} editedCar={editedCar} onInputChange={handleInputChange} onSaveChanges={handleSaveChanges} />
        }
    </div>
  );
};

export default ModalEditCar;
