import axios from 'axios'
import setAuthHeader from '../../../Auth/axiosUtils'
import { HandlError, showError,showSuccess } from '../../../Auth/HandlerError'

const sendChanges = async (carId, data, onClose) => {
    const id = carId;
    const newData = {newData:data}
    try {
        const response = await axios.patch(`/car/${id}`, newData, setAuthHeader());
      
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
   
}
export default sendChanges