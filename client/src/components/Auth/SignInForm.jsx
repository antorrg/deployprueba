import style from "./styles/Modal.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidCreate } from "./internalUtils/Validate";
import { createUser } from "./Auth";
import GenericButton from "../GenericButton/GenericButton";
import showConfirmationDialog from "../utils/sweetAlert";
import DivInput from "../GenericButton/DivInput";

const SignInForm = ({ openCreateCar, onClose }) => {
  const [input, setInput] = useState({
    email: "",
    name: "",
    typeId: "",
    numberId: "",
    country: "",
  });

  const [error, setError] = useState({
    email: "",
    name: "",
    typeId: "",
    numberId: "",
    country: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError({
      ...error,
      [name]: ValidCreate({ ...input, [name]: value })[name],
    });
  };

  const handleConfirmation = async (e) => {
    const validationErrors = ValidCreate(input);
    setError(validationErrors);
    if (Object.values(validationErrors).every((error) => error === "")) {
      await createUser(input, openCreateCar);
      setInput({
        email: "",
        name: "",
        typeId: "",
        numberId: "",
        country: "",
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de crear el usuario?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", realizar la acción de cambiar la contraseña
      handleConfirmation();
    }
  };

  const permit =
    !input.email.trim() ||
    !input.name.trim() ||
    !input.typeId.trim() ||
    !input.numberId.trim() ||
    !input.country.trim() ||
    error.email ||
    error.name ||
    error.typeId ||
    error.numberId ||
    error.country;

  return (
    <div>
      {/* className={style.bigDiv} */}
      <form onSubmit={handleSubmit}>
        <DivInput
          labelText={"Email"}
          name={"email"}
          value={input.email}
          handleChange={handleChange}
          error={error.email}
          labelWidth={150}
        />
        <DivInput
          labelText={"Nombre o Razón"}
          name={"name"}
          value={input.name}
          handleChange={handleChange}
          error={error.name}
          labelWidth={150}
        />
        <DivInput
          labelText={"Tipo Doc."}
          name={"typeId"}
          value={input.typeId}
          handleChange={handleChange}
          error={error.typeId}
          labelWidth={150}
          type="select"
          arrayOptions={[
            ["", "Selecciona un elemento"],
            ["DNI", "DNI"],
            ["CUIT", "CUIT"],
            ["CDI", "CDI"],
            ["PASSPORT", "Pasaporte"],
            ["CI_EXTRANGE", "CI extranjera"],
          ]}
        />
        {/* <div className={style.divInput}>
          <label className={style.labelInput} htmlFor="typeId">
            TIPO DE DOCUMENTO 
          </label>
          <select
            id="typeId"
            name="typeId"
            value={input.typeId}
            onChange={(event) => handleChange(event)}
            className={style.theInputs}
          >
            <option value="">Selecciona un tipo</option>
            <option value="DNI">DNI</option>
            <option value="CUIT">CUIT</option>
            <option value="CDI">CDI</option>
            <option value="PASSPORT">PASAPORTE</option>
            <option value="CI_EXTRANGE">CI extranjera.</option>
          </select>
          {error.typeId && <p className={style.errorMessage}>{error.typeId}</p>}
        </div> */}

        <DivInput
          type="number"
          labelText={"Nro Doc."}
          name={"numberId"}
          value={input.numberId}
          handleChange={handleChange}
          error={error.numberId}
          labelWidth={150}
        />
        <DivInput
          labelText={"País"}
          name={"country"}
          value={input.country}
          handleChange={handleChange}
          error={error.country}
          labelWidth={150}
        />
        <div className=" d-flex flex-wrap justify-content-center my-3">
          {/* <div className={style.divButtons}> */}
          <div className="m-3">
            <GenericButton
              type="submit"
              buttonText={"Crear usuario"}
              disabled={permit}
            />
          </div>
          <div className="m-3">
            <GenericButton onClick={onClose} buttonText={"Cancelar"} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
