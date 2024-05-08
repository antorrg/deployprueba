import style from "./styles/Modal.module.css";
import SignInForm from "./SignInForm";

const SignWindow = ({ onClose, openCreateCar }) => {
  return (
    <div className={`container shadow ${style.modal}`}>
      {/* <div className={style.barraLateral}></div> */}
      {/* <div className={style.content}> */}
      {/* <h2 className={style.titulo}>Registro de usuario</h2> */}
      <div className="fs-4 mb-3">Registrar usuario</div>

      <SignInForm openCreateCar={openCreateCar} onClose={onClose} />
      {/* </div> */}
    </div>
  );
};

export default SignWindow;
