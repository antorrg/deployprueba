import { useNavigate } from 'react-router-dom';
import style from '../styles/Modal.module.css'
import CreateService from './CreateService';
import GenericButton from '../../../../GenericButton/GenericButton';


const CreateServModal = ({closServ}) => {
  const navigate = useNavigate()
 
 const onClose =()=>{
  closServ()
 }

  return (
    <div className={style.modal}>
      <GenericButton onClick={onClose} buttonText={'Cancelar'} />
      <br/>
      <br/>
      <CreateService closServ={closServ}/>
    </div>
  );
};

export default CreateServModal;
