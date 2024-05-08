import style from "./styles/LoginForm.module.css";
import { useState, useEffect } from "react";
import GenericButton from "../GenericButton/GenericButton";
import { useNavigate } from "react-router-dom";
import { ValidLogin } from "./internalUtils/Validate";
import { loginUser } from "./Auth";

const LoginForm = ({ handleSignClick, auth }) => {
  const { login, authenticated, user } = auth;
  const navigate = useNavigate();
  //----------------------------------------
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (!authenticated) {
      setShowForm(true);
    } else {
      handleSignClick();
    }
  }, [authenticated, handleSignClick]);

  //-------------------------------------------------

  const onClose = () => {
    navigate("/");
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError({
      ...error,
      [name]: ValidLogin({ ...input, [name]: value })[name],
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const user = await loginUser(input, login);
    setInput({
      email: "",
      password: "",
    });
    if (user) {
      navigate("/home");
    }
    //}
  };
  const permit =
    !input.email.trim() ||
    !input.password.trim() ||
    error.email ||
    error.password
      ? true
      : null;

  return (
    <div
      className={`container my-5 col-sm-8 col-8 shadow p-3 ${style.form}`}
      style={{ maxWidth: "600px" }}
    >
      <div className="fs-3 m-3">Inicia sesión</div>
      {showForm && (
        <form
          className="row g-3 needs-validation my-3"
          novalidate
          onSubmit={(event) => handleSubmit(event)}
        >
          <div className="mb-3">
            <div className="input-group">
              <label
                htmlFor="email"
                className="input-group-text"
                style={{ width: "120px" }}
              >
                Email
              </label>

              <input
                type="text"
                // placeholder="email"
                value={input.email}
                name="email"
                id="email"
                autoComplete="off"
                onChange={(event) => handleChange(event)}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                required
              />
            </div>
            <div className="text-danger">{error.email}</div>
          </div>
          <div className="mb-3">
            <div className="input-group">
              <label
                htmlFor="password"
                className="input-group-text"
                style={{ width: "120px" }}
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                // placeholder="password"
                value={input.password}
                name="password"
                id="password"
                autoComplete="off"
                onChange={(event) => handleChange(event)}
                className="form-control"
                aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-default"
                required
              />

              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                className="btn btn-outline-secondary"
              >
                <i
                  className={showPassword ? "bi bi-eye-slash" : "bi bi-eye"}
                ></i>
              </button>
            </div>
            <div className="text-danger">{error.password}</div>
          </div>
          <div className=" d-flex flex-wrap justify-content-center my-3">
            <div className="m-3">
              <GenericButton
                type="submit"
                buttonText={"Iniciar sesión"}
                disabled={permit}
              />
              {/*en lugar de null va permit*/}
            </div>
            <div className="m-3">
              <GenericButton onClick={onClose} buttonText={"Cancelar"} />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LoginForm;

//  <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye' }></i>
