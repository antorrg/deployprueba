import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
 
 // errorHandler.js
  const HandlError = (error) => {
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      if (status === 400) {
        // Acceso no autorizado
        toast.error(`Error ${status} Petición fallida.`, data);
      } else if (status === 401) {
        // Acceso no autorizado
        toast.error('Acceso no autorizado. Debes iniciar sesión.');
      } else if (status === 404) {
        // Recurso no encontrado
        toast.error('Recurso no encontrado.');
      } else if (status === 403){
        toast.error('Prohibido, no tiene permisos para esta accion.');
      }else {
        // Otro error del servidor
        toast.error(`Error del servidor: ${status}`, data);
        //alert('Ocurrió un error en el servidor. Por favor, inténtalo de nuevo más tarde.');
      }
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      toast.error('No se recibió respuesta del servidor.');
      //alert('No se recibió respuesta del servidor. Por favor, inténtalo de nuevo más tarde.');
     } //else {
    //   // Error durante la configuración de la solicitud
    //   console.error('Error durante la configuración de la solicitud:', error.message);
    //   alert('Ocurrió un error durante la configuración de la solicitud. Por favor, inténtalo de nuevo.');
    // }
  };



const showSuccess = (mensaje) => {
  toast.success(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};

const showError = (mensaje) => {
  toast.error(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
const showInfo = (mensaje) => {
  toast.info(mensaje, {
    //position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
const showWarn = (mensaje) => {
  toast.warn(mensaje, {
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: 3000,
  });
};
export {
    HandlError,
    showError,
    showInfo,
    showSuccess,
    showWarn
};