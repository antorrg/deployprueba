import style from "../../../generalStyles/ModalsForms/Forms.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidServCreate from "../ServValidate";
import postService from "../SendServicePosts";
import GenericButton from "../../../../GenericButton/GenericButton";
import showConfirmationDialog from "../../../../utils/sweetAlert";
import DivInput from "../../../../GenericButton/DivInput";

const CreateService = ({ closServ }) => {
  const CarId = sessionStorage.getItem("CarId");

  const [input, setInput] = useState({
    type: "",
    detail: "",
    date_in: "",
    date_out: "",
    observations: "",
    CarId: CarId,
  });

  const [error, setError] = useState({
    type: "",
    detail: "",
    date_in: "",
    date_out: "",
    observations: "",
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
      [name]: ValidServCreate({ ...input, [name]: value })[name],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog(
      "¿Seguro desea crear el servicio?"
    );
    if (confirmed) {
      handleConfirmation();
    }
  };

  const handleConfirmation = async (e) => {
    const validationErrors = ValidServCreate(input);
    setError(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      await postService(input, closServ);
      setInput({
        type: "",
        detail: "",
        date_in: "",
        date_out: "",
        observations: "",
        CarId: CarId,
      });
      navigate("/admin");
    }
  };

  const permit =
    !input.detail.trim() ||
    !input.date_in.trim() ||
    !input.observations.trim() ||
    error.type ||
    error.detail ||
    error.date_in ||
    error.date_out ||
    error.observations;

  return (
    <div className={style.formContainer}>
      <form onSubmit={handleSubmit}>
        <div>
          <p className="fs-4">Crear Servicio</p>
        </div>
        <DivInput
          labelText={"Tipo"}
          name={"type"}
          value={input.type}
          error={error.type}
          handleChange={(event) => handleChange(event)}
          type="select"
          labelWidth={150}
          arrayOptions={[
            ["", "Elija un servicio..."],
            ["Service", "Service"],
            ["Reparacion", "Reparación"],
            ["Presupuesto", "Presupuesto"],
          ]}
        />
        {/* <div>
          <select name="type" onChange={(event) => handleChange(event)}>
            <option value=""> Elija un servicio...</option>
            <option value={"Service"}>Service</option>
            <option value={"Reparacion"}>Reparacion</option>
            <option value={"Presupuesto"}>Presupuesto</option>
          </select>
          <label> Tipo: </label>
          {error.type && <p className={style.errorMessage}>{error.type}</p>}
        </div> */}

        <DivInput
          labelText={"Detalle"}
          name={"detail"}
          value={input.detail}
          error={error.detail}
          handleChange={(event) => handleChange(event)}
          labelWidth={150}
        />

        <div className="input-group">
          <label className="input-group-text" style={{ width: "150px" }}>
            Fecha entrada
          </label>
          <input
            type="date"
            value={input.date_in}
            name="date_in"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            style={{
              display: "block",
              color: "#495057",
              backgroundColor: "#c3c3c3",
              minWidth: "200px",
              borderRadius: ".25rem",
              border: "1px solid #ced4da",
              padding: ".5rem",
            }}
          />
          <div className="text-danger">{error.date_in}</div>
        </div>

        <div className="input-group my-2">
          <label className="input-group-text" style={{ width: "150px" }}>
            Fecha salida
          </label>
          <input
            type="date"
            value={input.date_out}
            name="date_out"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            style={{
              display: "block",
              color: "#495057",
              backgroundColor: "#c3c3c3",
              minWidth: "200px",
              borderRadius: ".25rem",
              border: "1px solid #ced4da",
              padding: ".5rem",
            }}
          />
          <div className="text-danger">{error.date_out}</div>
        </div>

        <DivInput
          labelText={"Notas"}
          name={"observations"}
          value={input.observations}
          error={error.observations}
          handleChange={(event) => handleChange(event)}
          type="area"
          labelWidth={150}
        />

        <div className="my-4">
          <GenericButton
            type="submit"
            buttonText={"Crear Servicio"}
            disabled={permit}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateService;
