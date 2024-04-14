import style from "./styles/Car.module.css";
import { infoSelect } from "../AdminHelpers/Helpers/InfoMap";
import { Link } from "react-router-dom";

const Car = ({ data }) => {
  const {
    idUser,
    id,
    patent,
    mark,
    model,
    picture,
    Users,
  } = data;
  //console.log (data)
  const propietarios = infoSelect(data.Users);
  //data.Users && data.Users[0].name;
  //console.log(propietario)

  return (
    <div className={style.cardContainer}>
      <div>
        <p>Propietario:</p>
        {propietarios?.map((propietario, index) => (
          <span key={index}>
            <Link to={`/admin/dett/${propietario.id}?type=user`}>
              Nombre: {propietario.name}
            </Link>
            {index !== propietarios.length - 1 ? ", " : ""}
          </span>
        ))}
      </div>
      <p>Patente: {patent}</p>
      <p>Marca: {mark}</p>
      <p>Modelo: {model}</p>
      <Link to={`/admin/dett/${id}?type=car`}>Ver Vehiculo:</Link>
      <img src={picture} />
    </div>
  );
};

export default Car;
