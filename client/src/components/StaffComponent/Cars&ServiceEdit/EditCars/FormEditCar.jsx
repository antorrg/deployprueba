import { useState } from "react";
import style from "../../generalStyles/ModalsForms/Forms.module.css";
import GenericButton from "../../../GenericButton/GenericButton";
import showConfirmationDialog from "../../../utils/sweetAlert";
import ImgUpFire from "../../../ImgUpFire/ImgUpFire";
import DivInput from "../../../GenericButton/DivInput";

const FormEditCar = ({ editedCar, onInputChange, onSaveChanges }) => {
  const [imageUrl, setImageUrl] = useState(editedCar.picture);

  const onImageChange = (url) => {
    setImageUrl(url);
    //console.log(setImageUrl)
    onInputChange("picture", url);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await showConfirmationDialog(
      "Seguro desea actualizar el vehículo?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      onSaveChanges();
    }
  };

  return (
    <div className={style.formContainer}>
      <div>
        <p className="fs-4 mb-3">Editar Vehículo</p>
      </div>

      <div
        className="border rounded shadow my-3 mx-auto"
        style={{ maxWidth: "150px" }}
      >
        {imageUrl && (
          <img
            style={{ width: "100%", height: "auto" }}
            src={imageUrl}
            alt="Current Car"
          />
        )}
      </div>
      <ImgUpFire maxImages={1} uploadImgs={onImageChange} />
      <form onSubmit={handleSubmit}>
        <DivInput
          labelText={"Patente"}
          name={"patent"}
          value={editedCar.patent}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"Marca"}
          name={"mark"}
          value={editedCar.mark}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"Modelo"}
          name={"model"}
          value={editedCar.model}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"Año"}
          name={"year"}
          value={editedCar.year}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"N° motor"}
          name={"motorNum"}
          value={editedCar.motorNum}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"N° chasis"}
          name={"chassisNum"}
          value={editedCar.chassisNum}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"Notas"}
          name={"observations"}
          value={editedCar.observations}
          handleChange={handleInputChange}
          type="area"
        />

        <GenericButton type="submit" buttonText={"Actualizar"} />
      </form>
    </div>
  );
};

export default FormEditCar;
