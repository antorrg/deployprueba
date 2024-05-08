import style from "../../../generalStyles/ModalsForms/Forms.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidCar from "../CarServValidate";
import postCar from "../SendPosts";
import GenericButton from "../../../../GenericButton/GenericButton";
import ImgUpFire from "../../../../ImgUpFire/ImgUpFire";
import showConfirmationDialog from "../../../../utils/sweetAlert";
import DivInput from "../../../../GenericButton/DivInput";

const CreateCar = () => {
  const idUser = sessionStorage.getItem("idUser");
  const [input, setInput] = useState({
    patent: "",
    mark: "",
    model: "",
    year: "",
    motorNum: "",
    chassisNum: "",
    observations: "",
    picture: "",
    idUser: idUser,
  });

  const [error, setError] = useState({
    patent: "",
    mark: "",
    model: "",
    year: "",
    motorNum: "",
    chassisNum: "",
    observations: "",
  });

  const navigate = useNavigate();

  const handleUploadImg = (url) => {
    setInput((prevInput) => ({
      ...prevInput,
      picture: url, // Set the URL of the uploaded image
    }));
  };
  // const onImageChange = (url) => {
  //   setImageUrl(url);
  //   //console.log(setImageUrl)
  //   onInputChange("picture", url);
  // };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError({
      ...error,
      [name]: ValidCar({ ...input, [name]: value })[name],
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog(
      "¿Está seguro de crear el vehiculo?"
    );
    if (confirmed) {
      const validationErrors = ValidCar(input);
      setError(validationErrors);

      if (Object.values(validationErrors).every((error) => error === "")) {
        await postCar(input);
        setInput({
          patent: "",
          mark: "",
          model: "",
          year: "",
          motorNum: "",
          chassisNum: "",
          observations: "",
          picture: "",
          idUser: idUser,
        });
        navigate("/admin");
      }
    }
  };

  const permit =
    !input.patent.trim() ||
    !input.mark.trim() ||
    !input.model.trim() ||
    !input.year.trim() ||
    !input.motorNum.trim() ||
    !input.chassisNum.trim() ||
    !input.observations.trim() ||
    error.patent ||
    error.mark ||
    error.model ||
    error.year ||
    error.motorNum ||
    error.chassisNum ||
    error.observations;

  return (
    <div className={`shadow ${style.formContainer}`}>
      <div className="fs-4 mb-3">Registrar vehículo</div>
      <div>
        <ImgUpFire maxImages={1} uploadImgs={handleUploadImg} />
      </div>
      <form onSubmit={handleSubmit}>
        <DivInput
          labelText={"Patente"}
          name={"patent"}
          value={input.patent}
          error={error.patent}
          handleChange={handleChange}
        />
        <DivInput
          labelText={"Marca"}
          name={"mark"}
          value={input.mark}
          error={error.mark}
          handleChange={handleChange}
        />
        <DivInput
          labelText={"Modelo"}
          name={"model"}
          value={input.model}
          error={error.model}
          handleChange={handleChange}
        />
        <DivInput
          labelText={"Año"}
          name={"year"}
          value={input.year}
          error={error.year}
          handleChange={handleChange}
          type="number"
        />
        <DivInput
          labelText={"Nro motor"}
          name={"motorNum"}
          value={input.motorNum}
          error={error.motorNum}
          handleChange={handleChange}
        />
        <DivInput
          labelText={"Nro chasis"}
          name={"chassisNum"}
          value={input.chassisNum}
          error={error.chassisNum}
          handleChange={handleChange}
        />
        <DivInput
          labelText={"Notas"}
          name={"observations"}
          value={input.observations}
          error={error.observations}
          handleChange={handleChange}
          type="area"
        />

        <GenericButton
          type="submit"
          buttonText={"Crear Vehículo"}
          disabled={permit}
        />
      </form>
    </div>
  );
};

export default CreateCar;

/*
function DivInput({
  labelText,
  name,
  value,
  error,
  handleChange,
  type = "text",
  labelWidth = 100
}) {

  if (type === "area") {

    return (
      <div className="my-2">
        <div className="input-group">
          <label
            className="input-group-text"
            style={{ width: `${labelWidth}px` }}
          >
            {labelText}:
          </label>
          <textarea
            value={value}
            name={name}
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className="form-control"
          />
        </div>
        <div className="text-danger">{error}</div>
      </div>
    );
  } else {
    return (
      <div className="my-2">
        <div className="input-group">
          <label
            className="input-group-text"
            style={{ width: `${labelWidth}px` }}
          >
            {labelText}:
          </label>
          <input
            type={type}
            value={value}
            name={name}
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className="form-control"
          />
        </div>
        <div className="text-danger">{error}</div>
      </div>
    );
  }
}
*/
