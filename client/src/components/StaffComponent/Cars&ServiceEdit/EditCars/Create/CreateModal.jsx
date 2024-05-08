import style from "../../../generalStyles/ModalsForms/Modal.module.css";
import CreateCar from "./CreateCar";
import GenericButton from "../../../../GenericButton/GenericButton";

const CreateModal = ({ closer }) => {
  const onClose = () => {
    closer();
  };

  return (
    <div
      className={style.modal}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <CreateCar />
      </div>
      <div className="p-4 me-3" style={{ alignSelf: "flex-end" }}>
        <GenericButton onClick={onClose} buttonText={"Cancelar"} />
      </div>
    </div>
  );
};

export default CreateModal;
