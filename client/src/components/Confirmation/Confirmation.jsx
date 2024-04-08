import style from './Confirmation.module.css'
import { useNavigate} from 'react-router-dom';
import GenericButton from '../GenericButton/GenericButton';



const Confirmation = ({onConfirm, message, close}) => {
 const navigate =useNavigate()
    const onCancel = ()=>{
        navigate(-1)
    }
    const onClose = close? close : onCancel;

  return (
     <div className={style.confirmOverlay}>
      <div className={style.confirmBox}>
        <h2>¡Confirmar acción!</h2>
        <p>{message}</p>
        <GenericButton  onClick={onClose} buttonText={'Cancelar'}/>
        <GenericButton  onClick={onConfirm} buttonText={'Enviar'}/>
      </div>
      </div>
  );
};

export default Confirmation;
