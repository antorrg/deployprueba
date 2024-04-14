import style from '../styles/Modal.module.css'
import CreateCar from './CreateCar';
import GenericButton from '../../../../GenericButton/GenericButton';


const CreateModal = ({closer}) => {
 
 
 

  return (
    <div className={style.modal}>
      <GenericButton onClick={()=>{closer()}} buttonText={'Cancelar'} />
      <br/>
      <br/>
      <CreateCar/>
    </div>
  );
};

export default CreateModal;
