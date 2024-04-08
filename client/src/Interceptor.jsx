import axios from 'axios'
import { HandlError } from './components/Auth/HandlerError';


const interceptor = (logout) => {
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401 || error.response && error.response.status === 403) {
        // Acceso no autorizado, redirigir al inicio de sesión
        redirectToLogin(logout)
      }
      HandlError(error);
      return Promise.reject(error);
    }
  );
};

const redirectToLogin =(logout)=>{
  setTimeout(()=>{
    logout();
  },4000)
}
export default interceptor