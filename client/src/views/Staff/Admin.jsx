import style from "./styles/Admin.module.css";
import { useEffect, useState } from "react";
import GenericButton from "../../components/GenericButton/GenericButton";
import {
  UserGrid,
  CarGrid,
  CarryTable,
} from "../../components/StaffComponent/Index";
import { getAllCars, getAllUsers, getAllServices } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

const Admin = () => {
  const dispatch = useDispatch();

  //Logica para el panel de servicios
  const [service, setService] = useState(false);
  const services = useSelector((state) => state.services);

  const handleToggleServ = () => {
    setService(true);
  };
  const handleHiddeServ = () => {
    setService(false);
  };
  //------------------------------------------

  useEffect(() => {
    if (service === true) {
      dispatch(getAllServices());
    }
    dispatch(getAllUsers());
    dispatch(getAllCars());
  }, [service]);

  //! Estado para controlar qué componente hijo se muestra
  const [activeTab, setActiveTab] = useState("usuarios");

  // Función para cambiar la pestaña activa
  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  // Función para obtener el componente hijo actual
  const getCurrentTabComponent = () => {
    switch (activeTab) {
      case "usuarios":
        return <UserGrid />;
      case "vehiculos":
        return <CarGrid />;
      case "servicios":
        return <CarryTable data={services} />;
      default:
        return null;
    }
  };

  return (
    <div className="container my-3">
      <div>
        <ul className="nav nav-tabs">
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${activeTab === "usuarios" ? "active" : ""}`}
              onClick={() => handleTabChange("usuarios")}
            >
              Usuarios
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${
                activeTab === "vehiculos" ? "active" : ""
              }`}
              onClick={() => handleTabChange("vehiculos")}
            >
              Vehículos
            </a>
          </li>
          <li className="nav-item" style={{ cursor: "pointer" }}>
            <a
              className={`nav-link ${
                activeTab === "servicios" ? "active" : ""
              }`}
              onClick={() => handleTabChange("servicios")}
            >
              Servicios
            </a>
          </li>
        </ul>
      </div>
      {/* Renderizar el componente hijo actual */}
      <div className="container border border-top-0">
        {getCurrentTabComponent()}
      </div>
    </div>
  );
};

export default Admin;

function borrar() {
  return (
    <div className="container ">
      {/* <div className={`container ${style.bigDiv}`}> */}
      <div className="container">
        {/* <div className={`container ${style.cardList}`}> */}

        {!service ? (
          <>
            <div className="row border justify-content-center align-items-center">
              <div className="col border border-danger">
                <UserGrid />
              </div>
              <div className="col border">
                <CarGrid />
              </div>
            </div>
            <div>
              <GenericButton
                onClick={handleToggleServ}
                buttonText={"Servicios"}
              />
            </div>
          </>
        ) : (
          <>
            <GenericButton
              onClick={handleHiddeServ}
              buttonText={"Usuario/Vehículo"}
            />
            <CarryTable data={services} />
          </>
        )}
      </div>
    </div>
  );
}
