import { useState } from "react";
import style from "../styles/Form.module.css";
import GenericButton from "../../GenericButton/GenericButton";
import { useAuth } from "../AuthContext/AuthContext";
import EditPass from "./EditPass";
import showConfirmationDialog from "../../utils/sweetAlert";
import ImgUpFire from "../../ImgUpFire/ImgUpFire";
import DivInput from "../../GenericButton/DivInput";

const FormEdit = ({
  id,
  editedUser,
  onInputChange,
  onSaveChanges,
  onClose,
  logout,
}) => {
  const [imageUrl, setImageUrl] = useState(editedUser.picture);
  //console.log('soy el form ',imageUrl)
  const { authenticated, user } = useAuth();

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
      "¿Está seguro de actualizar el usuario?"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      onSaveChanges();
    }
  };

  return (
    <div className="container">
      {/*className={style.formContainer} */}
      <p className="fs-3">Editar Usuario</p>
      {/*sigue edición de imagen */}
      <div className="border rounded my-2 p-3">
        {imageUrl && (
          <img
            className="rounded my-2"
            style={{ maxWidth: "120px" }}
            src={imageUrl}
            alt="Current User"
          />
        )}
        <ImgUpFire maxImages={1} uploadImgs={onImageChange} />
      </div>
      {/* sigue Edición de datos */}
      <form onSubmit={handleSubmit} className="border rounded p-3 my-2">
        <DivInput
          labelText={"Nombre"}
          name={"name"}
          value={editedUser.name}
          handleChange={handleInputChange}
        />
        <DivInput
          labelText={"Email"}
          name={"email"}
          value={editedUser.email}
          handleChange={handleInputChange}
        />

        <DivInput
          labelText={"Tipo Doc."}
          type="select"
          name={"typeId"}
          value={editedUser.typeId}
          handleChange={handleInputChange}
          arrayOptions={[
            ["DNI", "DNI"],
            ["CUIT/CUIL", "CUIT/CUIL"],
            ["CDI", "CDI"],
            ["PASSPORT", "Pasaporte"],
            ["CI_EXTRANGE", "CI-extranjera"],
          ]}
        />

        <DivInput
          labelText={"N° Doc."}
          name={"numberId"}
          value={editedUser.numberId}
          handleChange={handleInputChange}
          type="number"
        />
        <DivInput
          labelText={"País"}
          name={"country"}
          value={editedUser.country}
          handleChange={handleInputChange}
          type="text"
        />

        {authenticated && (user.role === 1 || user.role === 2) ? null : (
          <>
            <DivInput
              labelText={"Rol"}
              name={"role"}
              value={editedUser.role}
              handleChange={handleInputChange}
              type="select"
              arrayOptions={[
                [0, "Admin"],
                [1, "Usuarios"],
                [2, "Mecánico"],
              ]}
            />
            <DivInput
              labelText={"Estado"}
              name={"enable"}
              value={editedUser.enable}
              handleChange={handleInputChange}
              type="select"
              arrayOptions={[
                [true, "Activo"],
                [false, "Bloqueado"],
              ]}
            />
          </>
        )}
        <div className="mt-3">
          <GenericButton type="submit" buttonText="Actualizar" />
        </div>
      </form>
      {/*sigue Modificar contraseña */}
      <div className="container border rounded  my-2">
        <EditPass id={id} onClose={onClose} logout={logout} />
      </div>
    </div>
  );
};

export default FormEdit;
