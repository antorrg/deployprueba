import GenericButton from "../../GenericButton/GenericButton";
import style from "../styles/Modal.module.css";
import { ValidPass } from "../internalUtils/Validate";
import { verifyPassword, changePassword } from "../Auth";
import { useState } from "react";
import showConfirmationDialog from "../../utils/sweetAlert";
import DivInput from "../../GenericButton/DivInput";

const EditPass = ({ id, onClose, logout }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const [verify, setVerify] = useState(true);
  const [inputPass, setInputPass] = useState({
    id: id,
    password: "",
  });

  const [input, setInput] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [error, setError] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePass = (event) => {
    const { name, value } = event.target;
    setInputPass({
      ...inputPass,
      [name]: value,
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError((prevError) => ({
      ...prevError,
      [name]:
        name === "confirmPassword" && value !== input.newPassword
          ? "Las contraseñas no coinciden"
          : ValidPass({ ...input, [name]: value })[name],
    }));
  };

  const userData = {
    id: inputPass.id,
    password: inputPass.password,
  };

  const handleSubmitVerify = async (event) => {
    event.preventDefault();
    //  lógica para verificar la contraseña actual
    const confirmed = await showConfirmationDialog(
      "¿Quiere verificar su contraseña?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      verifyPassword(userData, setVerify);
    }
  };

  const passChange = {
    password: input.newPassword,
  };

  const handleSubmitChange = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog(
      "¿Está seguro cambiar la contraseña?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      changePassword(id, passChange, setVerify, onClose, logout);
    }
  };

  const disabledInput = verify;
  const disabledBy =
    !input.newPassword.trim() ||
    !input.confirmPassword.trim() ||
    error.newPassword ||
    error.confirmPassword ||
    disabledInput;

  return (
    <div>

      <form className="row g-3 my-3">
        <div>
          <p className="fs-5">Modificar contraseña</p>
        </div>
        <div className="input-group">
          <label className="input-group-text" style={{ width: "120px" }}>
            Actual
          </label>
          <input
            type={showPassword ? "text" : "password"}
            value={inputPass.password}
            name="password"
            autoComplete="off"
            onChange={(event) => handleChangePass(event)}
            className="form-control"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setShowPassword(!showPassword);
            }}
          >
            <i className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}></i>

          </button>
        </div>
        <div>
          <GenericButton
            type="submit"
            onClick={handleSubmitVerify}
            buttonText={"Verificar"}
            disabled={!inputPass.password}
          />
          {!disabledInput ? (
            <label>¡Password confirmado! Puede continuar:</label>
          ) : null}
        </div>
        {/* Campos para el nuevo password */}
        <div className="input-group">
          <label className="input-group-text" style={{ width: "120px" }}>
            Nueva
          </label>
          <input
            type={showPassword1 ? "text" : "password"}
            value={input.newPassword}
            name="newPassword"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            disabled={disabledInput} // Deshabilitar si la contraseña actual no está verificada
            className="form-control"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setShowPassword1(!showPassword1);
            }}
          >
            <i className={showPassword1 ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </button>
          {error.newPassword && (
            <p className={style.errorMessage}>{error.newPassword}</p>
          )}
        </div>
        <div className="input-group">
          <label className="input-group-text" style={{ width: "120px" }}>
            Confirmar
          </label>
          <input
            className="form-control"
            type={showPassword2 ? "text" : "password"}
            value={input.confirmPassword}
            name="confirmPassword"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            disabled={disabledInput} // Deshabilitar si la contraseña actual no está verificada
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => {
              setShowPassword2(!showPassword2);
            }}
          >
            <i className={showPassword2 ? "bi bi-eye-slash" : "bi bi-eye"}></i>
          </button>
          {error.confirmPassword && (
            <p className={style.errorMessage}>{error.confirmPassword}</p>
          )}
        </div>
        <div>
          <GenericButton
            type="submit"
            onClick={handleSubmitChange}
            buttonText={"Modificar"}
            disabled={disabledBy}
          />
        </div>
      </form>

    </div>
  );
};

export default EditPass;
