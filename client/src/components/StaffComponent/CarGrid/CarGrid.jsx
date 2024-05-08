import Car from "./Car";
import style from "../generalStyles/CarUserGrids/Grid.module.css";
import { carByPat, getAllCars } from "../../../redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import GenericSearch from "../searchComp/GenericSearch";

const CarGrid = ({}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  //const {name}=useParams();
  //Separamos la query del params y hacemos dos variables:
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type"); //Obtener el type "user" o "car"
  const id = location.pathname.split("/").pop(); // Obtener el ID de la URL

  const found = useSelector((state) => state.byPat);
  const allCars = useSelector((state) => state.allCars);

  const name = type === "car" ? id : null;

  useEffect(() => {
    if (name) {
      dispatch(carByPat(name));
    } else {
      dispatch(getAllCars());
    }
  }, [dispatch, name]);

  return (
    <div className="container">
      <div className="container w-50 py-3">
        <GenericSearch
          dir={"admin"}
          dest={"admin"}
          query={"car"}
          searchFun={carByPat}
          place={"N° patente"}
        />
      </div>
      <div className={`container my-2 row g-2 ${style.cardList}`}>
        {name ? (
          <Car key={found.id} data={found} />
        ) : (
          allCars && allCars.map((frag) => <Car key={frag.id} data={frag} />)
        )}
      </div>
    </div>
  );
};

export default CarGrid;
