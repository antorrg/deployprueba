import style from "../generalStyles/CarUserGrids/Component.module.css";
import { infoSelect } from "../AdminHelpers/Helpers/InfoMap";
import { Link } from "react-router-dom";

const Car = ({ data }) => {
  const { idUser, id, patent, mark, model, picture, Users } = data;
  //console.log (data)
  const propietarios = infoSelect(data.Users);
  //data.Users && data.Users[0].name;
  //console.log(propietario)

  return (
    <div
      className="card shadow m-3"
      style={{ maxWidth: "540px", backgroundColor: "rgb(217, 206, 179)" }}
    >
      <div className="row g-0 ">
        <div
          className="col-md-4 d-flex justify-content-center align-items-center"
          style={{ minHeight: "220px" }}
        >
          <Link to={`/admin/dett/${id}?type=car`}>
            <img
              src={picture}
              className="img-fluid rounded"
              alt={picture}
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </Link>
        </div>
        <div className="col-md-8">
          <div className="card-body m-2 rounded border">
            <p className="card-text">Propietarios:</p>
            {propietarios?.map((propietario, index) => (
              <span key={index}>
                <Link to={`/admin/dett/${propietario.id}?type=user`}>
                  {propietario.name}
                </Link>
                {index !== propietarios.length - 1 ? ", " : ""}
              </span>
            ))}
          </div>
          <div className="border rounded m-2">
            <p className="my-1">Patente: {patent}</p>
            <p className="my-1">Marca: {mark}</p>
            <p className="my-1">Modelo: {model}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Car;
