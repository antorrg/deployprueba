import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../../redux/actions";
import GenericButton from "../../../GenericButton/GenericButton";
import showConfirmationDialog from "../../../utils/sweetAlert";
import sendChanges from "./SendChanges";
import styles from "../../generalStyles/ModalsForms/Forms.module.css";

const ChangeUser = ({ carEdit, onClose }) => {
  const dispatch = useDispatch();
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const users = useSelector((state) => state.allUsers);
  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmed = await showConfirmationDialog(
      "¿Está seguro de actualizar el vehiculo?"
    );
    if (confirmed) {
      // Llamar a la función sendChanges con el nuevo propietario seleccionado
      sendChanges(carEdit, selectedUserId, onClose);
    }
  };

  const handleSelectChange = (e) => {
    setSelectedUserId(e.target.value);
  };

  //<<<<<<<<<<<< searchbar >>>>>>>>>>>>>>>>>

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      const userFound = users.find((user) => user.numberId === searchTerm);
      if (userFound) {
        setSelectedUserId(userFound.id);
      }
    } else {
      setSelectedUserId(null);
      // Reiniciar el usuario seleccionado si el campo de búsqueda está vacío
    }
  };
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
  //<<<<<<<<inhabilitar el boton submit si no hay nada seleccionado>>>>>>>>>>>>>>>>>

  const permit = !selectedUserId ? true : false;

  return (
    <div className={styles.formContainer}>
      <p className="fs-4">Seleccione un propietario</p>

      {/*controles de buscar por dni */}
      <div className="m-5">
        <div className="input-group my-4">
          <label
            htmlFor="searchTerm"
            className="input-group-text"
            style={{ width: "150px" }}
          >
            N° documento
          </label>
          <input
            type="search"
            value={searchTerm}
            name="searchTerm"
            id="searchTerm"
            onChange={(event) => setSearchTerm(event.target.value)}
            className="form-control"
            aria-label="Sizing example input"
            aria-describedby="inputGroup-sizing-default"
            onKeyDown={handleKeyPress}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="btn btn-outline-secondary"
          >
            <i class="bi bi-search"></i>
          </button>
        </div>
        <div className="input-group my-4">
          <label
            htmlFor="dnis"
            className="input-group-text"
            style={{ width: "150px" }}
          >
            Propietario
          </label>
          {/* <form onSubmit={handleSubmit} className="form-select"> */}
          <select
            value={selectedUserId}
            onChange={handleSelectChange}
            name="dnis"
            className="form-select"
          >
            <option value="">Seleccione un propietario</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.typeId + ":" + user.numberId}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleSubmit}
            className="btn btn-outline-secondary"
            disabled={permit}
          >
            <i class="bi bi-arrow-left-right"></i>
          </button>
          {/* </form> */}
        </div>
      </div>
    </div>
  );
};

export default ChangeUser;
