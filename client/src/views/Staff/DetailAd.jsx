import { useEffect } from "react";
import { InnerDetail } from "../../components/StaffComponent/Index";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getById, carById, cleanDetails } from "../../redux/actions";

const DetailAd = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  //Separamos la query del params y hacemos dos variables:
  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get("type"); //Obtener el type "user" o "car"
  const id = location.pathname.split("/").pop(); // Obtener el ID de la URL
  //console.log(id)

  //Obtener la info del State
  const user = useSelector((state) => state.detailUsers);
  const cars = useSelector((state) => state.carById);
  const data = type === "user" ? user : cars;

  //const [data, setData] = useState(null);
  useEffect(() => {
    if (type === "user") {
      dispatch(getById(id));
      return () => {
        dispatch(cleanDetails());
      };
    } else if (type === "car") {
      dispatch(carById(id));
      return () => {
        dispatch(cleanDetails());
      };
    }
  }, [type, dispatch, id]);

  return (
    <div className="py-4 ">
      <InnerDetail type={type} data={data} />
    </div>
  );
};

export default DetailAd;
