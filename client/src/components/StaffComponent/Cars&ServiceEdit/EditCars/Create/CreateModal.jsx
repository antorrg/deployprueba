import { useNavigate } from 'react-router-dom';
import style from '../styles/Modal.module.css'
import CreateCar from './CreateCar';
import GenericButton from '../../../../GenericButton/GenericButton';


const CreateModal = ({closer}) => {
  const navigate = useNavigate()
 
 const onClose =()=>{
    closer();
   
 }

  return (
    <div className={style.modal}>
      <h2>Registrar vehiculo:</h2>
      <GenericButton onClick={onClose} buttonText={'Cancelar'} />
      <br/>
      <br/>
      <CreateCar/>
    </div>
  );
};

export default CreateModal;
