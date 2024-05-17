import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth/AuthContext/AuthContext";
import style from "./InnerDetail.module.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyServices } from "../../../redux/actions";
import GenericButton from "../../GenericButton/GenericButton";
import EditWindow from "../../Auth/EditComponents/ModalEdit";
import {
  CreateModal,
  CarryTable,
  CreateServModal,
  ModalEditCar,
  Edition,
} from "../Index";
import {
  infoSelect,
  roles,
  estado,
  allowing,
} from "../AdminHelpers/Helpers/InfoMap";

//Div de los del vehículos para renderizar
const DivList = ({ text, data }) => {
  return (
    <div className="container row border rounded my-1 mx-auto">
      <span className="text-start col-4 border-end">{text}</span>
      <span className="text-start col-8 ">{data}</span>
    </div>
  );
};

const InnerDetail = ({ type, data }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [userEdition, setUserEdition] = useState(false);
  const [createCar, setCreateCar] = useState(false);
  const [editCar, setEditCar] = useState(false);
  const infoEditing = useSelector((state) => state.LogIn);

  const onClose = () => {
    setUserEdition(false);
    setEditCar(false);
    //navigate(-1)
  };
  //Edicion de usuario
  const handlerUser = () => {
    setUserEdition(true);
  };
  //creacion y edicion de vehiculos
  const handlerCreate = () => {
    const userId = type === "user" ? data.id : null;
    sessionStorage.setItem("idUser", userId);
    setCreateCar(true);
  };
  const closerAd = () => {
    sessionStorage.clear();
    setCreateCar(false);
  };
  const handEditCar = () => {
    setEditCar(true);
  };
  //Presentacion y edicion de servicios
  const dispatch = useDispatch();
  //Servicios:
  const services = useSelector((state) => state.servByCar);
  const [serv, setServ] = useState(false);
  const [creatServ, setCreatServ] = useState(false);

  const carId = type === "car" ? data.id : null;

  const handleServ = () => {
    sessionStorage.setItem("CarId", carId);
    setServ(true);
  };
  const servClose = () => {
    sessionStorage.clear();
    setServ(false);
  };
  const createServ = () => {
    setCreatServ(true);
  };
  const closServ = () => {
    setCreatServ(false);
  };
  useEffect(() => {
    if (serv === true) {
      dispatch(getMyServices(carId));
    }
  }, [serv]);
  //================================================
  const pars = type === "car" ? data.Users : data.Cars;
  const propietarios = infoSelect(pars);
  const info1 = type === "user" ? data.role : null;
  const rol = roles(info1);
  const info2 = data.enable ? data.enable : null;
  const enable = estado(info2);
  //Logica para gestionar permiso de edicion a usuario de su propia cuenta:

  const edt = allowing(infoEditing, data);
  //console.log('puedo editarme? ',edt)
  //===================================================
  return (
    <div className="container">
      <div className="row align-items-center my-2">
        <div className="col"></div>
        <div className="col">
          <p className="fs-4">{type === "car" ? "Vehículo" : "Usuario"}</p>
        </div>
        <div className="col text-end">
          <GenericButton
            onClick={() => {
              navigate(-1);
            }}
            buttonText={"Volver"}
          />
        </div>
      </div>

      {type === "car" && (
        <>
          <div className="container border border-warning-subtle rounded justify-content-center align-items-center">
            {/*div de la Card */}
            <div
              className="my-4 col-xl-8 col-lg-10 mx-auto row border rounded shadow py-3"
              style={{ backgroundColor: "rgb(217, 206, 179)" }}
            >
              {/*contenedor de la imagen */}
              <div
                className="container rounded my-3 col-md-4 d-flex justify-content-center align-items-center"
                // style={{ maxHeight: "300px", maxWidth: "300px" }}
              >
                <img
                  src={data.picture}
                  style={{ width: "100%", height: "auto" }}
                  className="rounded"
                />
              </div>
              {/*contenedor de la lista  */}
              <div className="col-md-8">
                <DivList text={"Patente"} data={data.patent} />
                <DivList text={"Marca"} data={data.mark} />

                <DivList text={"Modelo"} data={data.model} />
                <DivList text={"Año"} data={data.year} />
                <DivList text={"N° motor"} data={data.motorNum} />
                <DivList text={"N° chasis"} data={data.chassisNum} />
                <DivList text={"Estado"} data={enable} />
                <DivList
                  text={"Creado"}
                  data={new Date(data.createdAt).toLocaleDateString()}
                />
                <DivList
                  text={"Actualizado"}
                  data={new Date(data.updatedAt).toLocaleDateString()}
                />
              </div>
            </div>
            {user.role && user.role === 1 ? null : (
              <>
                <div className="border rounded my-2 col-md-6 mx-auto py-2">
                  <span>Propietario:</span> <br />
                  {propietarios?.map((propietario, index) => (
                    <span key={index}>
                      <Link to={`/admin/dett/${propietario.id}?type=user`}>
                        Nombre: {propietario.name}
                      </Link>
                      {index !== propietarios.length - 1 ? ", " : ""}
                    </span>
                  ))}
                </div>
              </>
            )}
            <div className="border rounded my-2 col-md-6 mx-auto py-2">
              <label>Observaciones: {data.observations}</label>
            </div>
            {/*mostramos los botones para Editar veh. o Servicios... */}
            <div className="d-flex flex-wrap justify-content-center">
              <div className="m-2">
                <Edition
                  allowedRoles={[0, 2]}
                  onClick={handEditCar}
                  text={"Editar Veh."}
                />
              </div>
              {serv ? (
                <>
                  <div className="m-2">
                    <GenericButton
                      onClick={servClose}
                      buttonText={"Cerrar Serv"}
                    />
                  </div>
                  <div className="m-2">
                    <Edition
                      allowedRoles={[0, 2]}
                      onClick={createServ}
                      text={"Crear Serv"}
                    />
                  </div>
                  <div className="container m-2 col-12 col-sm-12 col-md-12 col-lg-12 col-xl-10">
                    <CarryTable data={services} />
                  </div>
                </>
              ) : (
                <div className="m-2">
                  <GenericButton
                    onClick={handleServ}
                    buttonText={"Ver Servicios"}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      {type === "user" && (
        <div className="container border border-warning-subtle rounded">
          {/*Contenedor de la imagen */}
          <div className="container my-3">
            <img
              src={data.picture}
              style={{
                width: "180px",
                height: "180px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
              className="border "
            />
          </div>

          {/*contenedor de los datos */}
          <div className="container row my-3">
            {/*contenedor de datos de usuario */}
            <div className="col-lg-6 my-2 mx-auto">
              <DivList text={"Email"} data={data.email} />
              <DivList text={"Nombre"} data={data.name} />
              <DivList text={"Apodo"} data={data.nickname} />

              <DivList text={"Tipo Doc."} data={data.typeId} />
              <DivList text={"N° documento"} data={data.numberId} />
              <DivList text={"Rol"} data={rol} />
              <DivList text={"País"} data={data.country} />
              <DivList text={"Estado"} data={enable} />
              <DivList
                text={"Creado"}
                data={new Date(data.createdAt).toLocaleDateString()}
              />
              <DivList
                text={"Actualizado"}
                data={new Date(data.updatedAt).toLocaleDateString()}
              />
            </div>
            {/*contendor de las patentes de vehículos del usuario */}
            {user.role === 0 || user.role === 2 ? (
              <div className="col-lg-6 my-2 mx-auto">
                <p>Vehículos:</p>
                {propietarios?.map((propietario, index) => (
                  <div
                    key={index}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <div
                      className="border border-black border-2 rounded my-2 mx-auto"
                      style={{ width: "160px", textAlign: "center" }}
                    >
                      <div
                        style={{ height: "20px", backgroundColor: "blue" }}
                      ></div>
                      <div>
                        <Link to={`/admin/dett/${propietario.id}?type=car`}>
                          {propietario.name}
                        </Link>
                      </div>
                    </div>
                    {/* {index !== propietarios.length - 1 ? ", " : ""} */}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
          {/*contenedor de los botones inferiores */}
          <div className="container d-flex flex-wrap gap-1 justify-content-center mb-2">
            <div>
              <Edition
                allowedRoles={[0]}
                exception={edt}
                onClick={handlerUser}
                text={"Editar Usuario"}
              />
            </div>
            <div>
              <Edition
                allowedRoles={[0, 2]}
                onClick={handlerCreate}
                text={"Crear Vehículo"}
              />
            </div>
          </div>
        </div>
      )}

      <div className="container p-2">
        <Edition
          onClick={() => {
            navigate("/admin");
          }}
          text={"Panel Admin"}
          allowedRoles={[0, 2]}
        />
      </div>

      {userEdition ? <EditWindow userEdit={data} onClose={onClose} /> : null}
      {createCar ? <CreateModal closer={closerAd} /> : null}
      {creatServ ? <CreateServModal closServ={closServ} /> : null}
      {editCar ? <ModalEditCar carEdit={data} onClose={onClose} /> : null}
    </div>
  );
};

export default InnerDetail;
