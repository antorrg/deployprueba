import { useNavigate } from "react-router-dom";
import style from "../../../generalStyles/ModalsForms/Modal.module.css";
import CreateService from "./CreateService";
import GenericButton from "../../../../GenericButton/GenericButton";

const CreateServModal = ({ closServ }) => {
  const navigate = useNavigate();

  const onClose = () => {
    closServ();
  };

  return (
    <div
      className={style.modal}
      style={{ display: "flex", flexDirection: "column" }}
    >
      <div style={{ flex: 1 }}>
        <CreateService closServ={closServ} />
      </div>
      <div className="container py-4">
        <GenericButton onClick={onClose} buttonText={"Cancelar"} />
      </div>
    </div>
  );
};

export default CreateServModal;
