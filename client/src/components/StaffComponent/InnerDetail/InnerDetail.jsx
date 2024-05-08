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
              className="my-4 col-xl-8 col-lg-10 mx-auto row border rounded shadow"
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
                <ul className={style.list} style={{ listStyle: "none" }}>
                  <li>Patente: {data.patent}</li>
                  <li>Marca: {data.mark}</li>
                  <li>Modelo: {data.model}</li>
                  <li>Año: {data.year}</li>
                  <li>N° motor: {data.motorNum}</li>
                  <li>N° chasis: {data.chassisNum}</li>
                  <li>Estado: {enable}</li>
                  <li>
                    Creado: {new Date(data.createdAt).toLocaleDateString()}
                  </li>
                  <li>
                    Actualizado: {new Date(data.updatedAt).toLocaleDateString()}
                  </li>
                </ul>
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
                  <div className="m-2 col-8">
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
          <div
            className="container rounded-circle overflow-hidden d-flex align-items-center justify-content-center my-3"
            style={{ maxHeight: "150px", maxWidth: "150px" }}
          >
            <img
              src={data.picture}
              style={{ width: "auto", height: "100%", objectFit: "cover" }}
              className="align-self-center"
            />
          </div>

          <div className="row  my-3">
            <div className="col my-2">
              <ul className={style.list} style={{ listStyleType: "none" }}>
                <li>Email: {data.email}</li>
                <li>Nombre: {data.name}</li>
                <li>Apodo: {data.nickname}</li>
                <li>Tipo documento: {data.typeId}</li>
                <li>Número documento: {data.numberId}</li>
                <li>Rol: {rol}</li>
                <li>País: {data.country}</li>
                <li>Estado: {enable}</li>
                <li>Creado: {new Date(data.createdAt).toLocaleDateString()}</li>
                <li>
                  Actualizado: {new Date(data.updatedAt).toLocaleDateString()}
                </li>
              </ul>
            </div>
            {user.role === 0 || user.role === 2 ? (
              <div className="col my-2">
                <p>Vehículo:</p>
                {propietarios?.map((propietario, index) => (
                  <span key={index}>
                    <Link to={`/admin/dett/${propietario.id}?type=car`}>
                      Patente: {propietario.name}
                    </Link>
                    {index !== propietarios.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            ) : null}
          </div>

          <div className="d-flex flex-wrap justify-content-center">
            <div className="m-2">
              <Edition
                allowedRoles={[0]}
                exception={edt}
                onClick={handlerUser}
                text={"Editar Usuario"}
              />
            </div>
            <div className="m-2">
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
