import style from "../generalStyles/CarUserGrids/Component.module.css";
import { infoSelect } from "../AdminHelpers/Helpers/InfoMap";
import { Link } from "react-router-dom";

const User = ({ data }) => {
  const { id, email, name, picture, typeId, numberId, enable, Cars } = data;

  const usuario = (data) => {
    if (data === true) {
      return "Activo";
    } else {
      return "Bloqueado";
    }
  };
  const MaxLength = 30;
  const truncatedEmail =
    email && email.length > MaxLength
      ? email.substring(0, MaxLength) + "..."
      : email;
  const vehiculos = infoSelect(Cars);
  return (
    <div
      className="card shadow m-3"
      style={{ maxWidth: "540px", backgroundColor: "rgb(217, 206, 179)" }}
    >
      <div className="row g-0">
        <div className="col-md-4 d-flex justify-content-center align-items-center">
          <img
            src={picture}
            className="img-fluid rounded-start"
            alt={picture}
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <Link to={`/admin/dett/${id}?type=user`}>
              <h5 className="card-title">{name}</h5>
            </Link>

            <p className="card-text">
              Email: <span title={email}>{truncatedEmail}</span>
            </p>
            <p className="card-text">Estado: {usuario(enable)}</p>
            <p className="card-text">
              <div className="border rounded">
                <p>Vehículos:</p>
                {vehiculos?.map((vehiculo, index) => (
                  <span key={index}>
                    <Link to={`/admin/dett/${vehiculo.id}?type=car`}>
                      Patente: {vehiculo.name}
                    </Link>
                    {index !== vehiculos.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
              {/* <small className="text-body-secondary">
                  Last updated 3 mins ago
                </small> */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

function CardOld() {
  return (
    <div className={style.cardContainer}>
      <p>Nombre: {name}</p>
      <Link to={`/admin/dett/${id}?type=user`}>Ver Usuario:</Link>
      <p>
        Email: <span title={email}>{truncatedEmail}</span>
      </p>

      {/* <p>Email: {email}</p> */}
      <p>Estado: {usuario(enable)}</p>
      <div>
        <p>Vehiculos:</p>
        {vehiculos?.map((vehiculo, index) => (
          <span key={index}>
            <Link to={`/admin/dett/${vehiculo.id}?type=car`}>
              Vehiculo pat: {vehiculo.name}
            </Link>
            {index !== vehiculos.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
