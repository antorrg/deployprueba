import axios from 'axios'
import setAuthHeader from '../../../Auth/axiosUtils'
import { HandlError, showError,showSuccess } from '../../../Auth/HandlerError'

const deleteCar = async (id, onClose) => {
    try {
      const response = await axios.delete(`/car/${id}`, setAuthHeader());
      if (response.status === 200) {
        showSuccess('Vehiculo eliminado con éxito')
       onClose(); // Cierra el modal después de guardar los cambios
      } else {
        showError('Error al eliminar el vehiculo')
      }
    } catch (error) {
      HandlError({error:error.message})
    }
  };
  
export default deleteCar;