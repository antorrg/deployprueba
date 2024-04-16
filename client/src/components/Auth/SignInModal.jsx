import style from './styles/Modal.module.css'
import SignInForm from './SignInForm';



const SignWindow = ({ onClose, openCreateCar }) => {



  return (
    <div className={style.modal}>
      <div className={style.barraLateral}>
      </div>
      <div className={style.content}>
        <h2 className={style.titulo}>REGISTRO</h2>
        <br></br>

        <SignInForm openCreateCar={openCreateCar} onClose={onClose} />
        <br></br>
      </div>

    </div>
  );
};

export default SignWindow;
