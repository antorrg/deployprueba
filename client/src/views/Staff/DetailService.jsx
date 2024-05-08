import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GenericButton from "../../components/GenericButton/GenericButton";
import { servicesById, cleanDetails } from "../../redux/actions";

const DetailService = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const service = useSelector((state) => state.servById);
  const { id } = useParams();

  useEffect(() => {
    dispatch(servicesById(id));
    return () => {
      dispatch(cleanDetails());
    };
  }, [dispatch, id]);
  const att = service.Car?.patent;

  return (
    <div
      className="container w-50 border rounded shadow my-5 py-5"
      style={{ backgroundColor: "rgb(217, 206, 179)" }}
    >
      <p className="fs-3">Detalle del servicio </p>
      <ul className="list-group list-group-horizontal row w-75 mx-auto my-1">
        <li className="list-group-item col-4 text-start">Patente</li>
        <li className="list-group-item col-8 text-start">{att}</li>
      </ul>
      <ul className="list-group list-group-horizontal row w-75 mx-auto my-1">
        <li className="list-group-item col-4 text-start">Servicio Prestado</li>
        <li className="list-group-item col-8 text-start">{service.type}</li>
      </ul>
      <ul className="list-group list-group-horizontal row w-75 mx-auto my-1">
        <li className="list-group-item col-4 text-start">Detalle</li>
        <li className="list-group-item col-8 text-start">{service.detail}</li>
      </ul>
      <ul className="list-group list-group-horizontal row w-75 mx-auto my-1">
        <li className="list-group-item col-4 text-start">Fecha entrada</li>
        <li className="list-group-item col-8 text-start">{service.date_in}</li>
      </ul>
      <ul className="list-group list-group-horizontal row w-75 mx-auto my-1">
        <li className="list-group-item col-4 text-start">Fecha salida</li>
        <li className="list-group-item col-8 text-start">{service.date_out}</li>
      </ul>
      <ul className="list-group list-group-horizontal row w-75 mx-auto my-1">
        <li className="list-group-item col-4 text-start">Registro creado</li>
        <li className="list-group-item col-8 text-start">
          {service.createdAt}
        </li>
      </ul>

      <div className="border w-75 my-2 p-1 mx-auto rounded">
        <p className="fs-5">Observaciones </p>
        <span className="border fst-italic">{service.observations}</span>
      </div>

      <div className="my-4">
        <GenericButton
          onClick={() => {
            navigate(-1);
          }}
          buttonText={"Volver"}
        />
      </div>
    </div>
  );
};

export default DetailService;
