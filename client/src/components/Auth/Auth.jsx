import axios from "axios";
import {HandlError,showSuccess, showError} from './HandlerError';
import setAuthHeader from './axiosUtils'




const createUser = async(userData,openCreateCar)=>{
    const email = userData.email;
  const name = userData.name;
  const typeId = userData.typeId;
  const numberId = userData.numberId;
  const country = userData.country;
  try {
    const response = await axios.post(`/user/create`, {
        email,
        name,
        typeId,
        numberId,
        country
    }, setAuthHeader())
    if (response.status === 201) {
      //const token = response.data.token;
      const user = response.data.data;
      const idUser =user.id
      sessionStorage.setItem('idUser',idUser)
       showSuccess('User created successfully')
       openCreateCar();
        //console.log(user)
        return user;
      }
  } catch (error) {
    HandlError(error);
    throw error;
  }
}
const loginUser = async(userData,login)=>{
    const email = userData.email;
    const password = userData.password;
    try {
        const response = await axios.post(`/user/login`,{
            email,
            password,
        });
        if (response.status === 200) {
          //console.log(response.data.data)
          const token = response.data.token;
          const user = response.data.data;
          login(token, user);
          //console.log(token)
          //console.log("Token almacenado en localStorage:", localStorage.getItem('validToken'));
      
          
            showSuccess('Login sucessfully')
            //console.log(token)
            //console.log(user)
            
              return user;
        }
       
        } catch (error) {
          showError('Login fallido')
          //HandlError(error);
          throw error;
        }
               
            }  

            const verifyPassword = async(userData, setVerify)=>{
              const id = userData.id;
              const password = userData.password;
              try {
                  const response = await axios.post(`/user`,{
                      id,
                      password,
                  }, setAuthHeader());
                  if (response.status === 200) {
                    //console.log(response.data)
                    const user = response.data;
                      showSuccess('Verificacion exitosa')
                      //console.log(user)
                      setVerify(false)
                        return user;
                  }
                  } catch (error) {
                    showError('Verificacion fallida')
                    HandlError(error);
                    throw error;
                  }  
                  }
          
                      const changePassword  = async (id, passChange,setVerify, onClose, logout) => {
                        //Lógica para guardar los cambios (puedes conectarlo a tus acciones de Redux)
                        try {
                          // Realiza la solicitud PUT con Axios
                          const response = await axios.put(`/user/${id}`,passChange, setAuthHeader());
                          
                          if (response.status === 200) {
                            showSuccess('Usuario actualizado con éxito. Inicie sesion nuevamente')
                            setVerify(true)
                           onClose(); // Cierra el modal después de guardar los cambios
                           setTimeout(()=>{
                            logout()
                           }, 5000)
                          } else {
                            showError('Error al actualizar el usuario')
                          }
                        } catch (error) {
                          HandlError({error:error.message})
                          console.error('Error al actualizar el usuario:', error);
                        }
                      };


export {
    createUser,
    loginUser,
    verifyPassword,
    changePassword 
}

