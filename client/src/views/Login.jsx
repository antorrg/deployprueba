import style from '../components/Auth/styles/Modal.module.css'
import {useState}from 'react'
import {useNavigate} from 'react-router-dom'
import {LoginForm,SignWindow} from '../components/Auth/AuthIndex';
import {useAuth}from '../components/Auth/AuthContext/AuthContext'
import  {CreateModal} from '../components/StaffComponent/Index'

const Login = () => {
  const auth = useAuth();
  const navigate= useNavigate()
  
//  useEffect(()=>{
//    dispatch(getAllUsers())
//  },[])
 
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateCarOpen, setIsCreateCarOpen] = useState(false);
//---------funciones para el modal creacion usuario---------
  const handleSignClick = () => {
    setIsModalOpen(true);
  };

  const handleSignWindowClose = () => {
    setIsModalOpen(false);
    navigate(-1)
  };
// ------------funciones para el modal creacion de vehiculos--------------
const openCreateCar = () => {
   setIsCreateCarOpen(true);
};

const closer = () => {
  handleSignWindowClose()
  setIsCreateCarOpen(false);
};
//----------------------------------------------------------
  return (
    <div className={style.window}>
     
      <LoginForm handleSignClick= {handleSignClick} auth={auth} />
      <div>
      {isModalOpen && <SignWindow onClose={handleSignWindowClose} openCreateCar= {openCreateCar}/>}
      </div>
      <div>
        {isCreateCarOpen && <CreateModal closer={closer}/>}
      </div>
    </div>
  )
}
export default Login;