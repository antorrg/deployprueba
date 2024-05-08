import style from "../generalStyles/ServicesComponents/Row.module.css";
import { useNavigate, useLocation } from "react-router-dom";

const RowTable = ({ data }) => {
  const { id, type, date_in, date_out, createdAt, Car } = data;
  const navigate = useNavigate();
  const location = useLocation();
  const pathServ = location.pathname.split("/")[1];
  const att = Car?.patent;
  const allow = typeof id === "boolean" ? true : false;

  //Funciones de edicion para los botones:
  const handleClick = () => {
    navigate(`/${pathServ}/detailservice/${id}`);
  };

  return (
    <div className={`container row ${style.row}`}>
      <div className="col-11 row">
        <div className="col d-flex justify-content-start align-items-center">
          <i className="bi bi-car-front-fill me-2"></i>
          <span> {att}</span>
        </div>

        <div className="col d-flex justify-content-start align-items-center">
          <i className="bi bi-stoplights me-2 text-primary"></i>
          <span> {type}</span>
        </div>
        <div className="col d-flex justify-content-start align-items-center">
          <i className="bi bi-box-arrow-in-right me-2 text-danger"></i>
          <span> {date_in}</span>
        </div>

        <div className="col d-flex justify-content-start align-items-center">
          <i className="bi bi-box-arrow-right me-2 text-success"></i>

          <span> {date_out}</span>
        </div>
      </div>
      <div className="col-1 row">
        <div className="col d-flex justify-content-start align-items-center">
          <button
            type="button"
            onClick={handleClick}
            disabled={allow}
            className="btn btn-outline-secondary my-1"
          >
            <i className="bi bi-eye"></i>
          </button>
        </div>
      </div>

      {/* <div>
        <h5>Servicio Creado: </h5>
        {createdAt}
      </div> */}
    </div>
  );
};

export default RowTable;
