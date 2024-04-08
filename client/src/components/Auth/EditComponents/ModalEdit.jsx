import { useState } from 'react';
import style from '../styles/Modal.module.css'
import FormEdit from './FormEdit';
import axios from 'axios'
import {useAuth} from '../AuthContext/AuthContext'
import GenericButton from '../../GenericButton/GenericButton';
import {showError, showSuccess, HandlError}from '../HandlerError';
import showConfirmationDialog from '../../utils/sweetAlert';
import setAuthHeader from '../axiosUtils'



const EditWindow = ({ onClose, userEdit}) => {
  const {authenticated, user, logout}= useAuth()
  const {id, email,name, typeId, numberId, role, enable, country, picture}= userEdit;
 
  const [editedUser, setEditedUser] = useState({
    email,
    name,
    typeId,
    numberId,
    country,
    picture,
    role,
    enable,
  });

//console.log(editedUser)

  const handleInputChange = (name, value) => {
    const processedValue = name === 'enable' ? value === 'true' : value;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: processedValue,
    }));
  };
  const resetUser = ()=>{
    if(user.id === id){
      showSuccess(`Usuario actualizado con éxito. \n Inicia sesion nuevamente`)
      setTimeout(()=>{
        logout();
       },4000)
    }else{
      showSuccess(`Usuario actualizado con éxito`)
      null;
    }
  }
  const handleSaveChanges = async () => {
  
    //Lógica para guardar los cambios
    try {
      // Realiza la solicitud PUT con Axios
      const response = await axios.put(`/user/${id}`,editedUser, setAuthHeader());
      
      if (response.status === 200) {
        //showSuccess(`Usuario actualizado con éxito. \n Inicia sesion nuevamente`)
       onClose(); // Cierra el modal después de guardar los cambios
       resetUser();
       
      } else {
        showError('Error al actualizar el usuario')
      }
    } catch (error) {
      HandlError({error:error.message})
      console.error('Error al actualizar el usuario:', error);
    }
  };
  
  const resetPassword = async () => {
    const confirmed = await showConfirmationDialog('¿Está seguro de resetear la contraseña?');
    if (confirmed) {
      onResetPass()
    }
  };
  

 const onResetPass = async()=>{
  try {
    const response = await axios.patch(`/user/${id}`, null, setAuthHeader());
    if (response.status === 200) {
      showSuccess('Contraseña actualizada con exito')
     onClose(); // Cierra el modal después de guardar los cambios
    } else if (response.status ===400){
      showError('Error al actualizar la contraseña')
    }
  } catch (error) {
    if (error.response) {// Si hay una respuesta del servidor, muestra el mensaje de error correspondiente
      HandlError(error);
    } else {// Si no hay respuesta del servidor, muestra un mensaje de error genérico
      showError('Error al actualizar la contraseña');
    }
  }
 }

 
  return (
    <div className={style.modal}>
      <h2>Editar Usuario</h2>
      <FormEdit id = {id} editedUser={editedUser} onInputChange={handleInputChange} onSaveChanges={handleSaveChanges} onClose={onClose} logout={logout}/>
      <GenericButton onClick= {onClose} buttonText='Cancelar'/>
      {authenticated && user.role===0? (
      <GenericButton onClick= {resetPassword} buttonText='Reset Password'/>) : null}
    </div>
  );
};

export default EditWindow;
