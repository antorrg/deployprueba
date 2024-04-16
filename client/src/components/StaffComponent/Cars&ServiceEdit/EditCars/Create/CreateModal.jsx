import style from '../../../generalStyles/ModalsForms/Modal.module.css'
import CreateCar from './CreateCar';
import GenericButton from '../../../../GenericButton/GenericButton';


const CreateModal = ({closer}) => {
  
 
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
