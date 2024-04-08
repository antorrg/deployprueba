import style from './styles/Modal.module.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidCreate } from './internalUtils/Validate';
import { createUser } from './Auth';
import GenericButton from '../GenericButton/GenericButton';
import showConfirmationDialog from '../utils/sweetAlert';


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

  const handleSubmit = async(event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog('¿Está seguro de crear el usuario?');
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
    <div className={style.bigDiv}>
      <form onSubmit={handleSubmit}>
        <div className={style.divInput}>
          <label className={style.labelInput}> EMAIL </label>
          <input
            type="text"
            value={input.email}
            name="email"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className={style.theInputs}
          />
          {error.email && <p className={style.errorMessage}>{error.email}</p>}
        </div>
        <div className={style.divInput}>
          <label className={style.labelInput}> NOMBRE, APELLIDO O RAZON SOCIAL </label>
          <input
            type="text"
            value={input.name}
            name="name"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className={style.theInputs}
          />
          {error.name && <p className={style.errorMessage}>{error.name}</p>}
        </div>
        <div className={style.divInput}>
          <label className={style.labelInput} htmlFor="typeId">TIPO DE DOCUMENTO</label>
          <select
            id="typeId"
            name="typeId"
            value={input.typeId}
            onChange={(event) => handleChange(event)}
            className={style.theInputs}>
            <option value="">Selecciona un tipo</option>
            <option value="DNI">DNI</option>
            <option value="CUIT">CUIT</option>
            <option value="CDI">CDI</option>
            <option value="PASSPORT">PASAPORTE</option>
            <option value="CI_EXTRANGE">CI extranjera.</option>

          </select>
          {error.typeId && <p className={style.errorMessage}>{error.typeId}</p>}
        </div>
        <div className={style.divInput}>
          <label className={style.labelInput} htmlFor="numberId">NUMERO DE DOCUMENTO</label>
          <input
            type="text"
            id="numberId"
            name="numberId"
            value={input.numberId}
            onChange={(event) => handleChange(event)}
            className={style.theInputs} />
          {error.numberId && <p className={style.errorMessage}>{error.numberId}</p>}
        </div>
        <div className={style.divInput}>
          <label className={style.labelInput}> PAIS </label>
          <input
            type="text"
            value={input.country}
            name="country"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className={style.theInputs}
          />
          {error.country && <p className={style.errorMessage}>{error.country}</p>}
        </div>
        <div className={style.divButtons}>
          <GenericButton type='submit' buttonText={'CREAR USUARIO'} disabled={permit}/>
          <GenericButton onClick={onClose} buttonText={'CANCELAR'} />
        </div>
      </form>
    </div>
  );
};

export default SignInForm;

