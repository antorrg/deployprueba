import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// import style from "../styles/Home.module.css";

const Home = () => {
  const myData = useSelector((state) => state.LogIn);
  const name = myData.name ? myData.name : myData.nickname;
  const cars = myData.Cars ? myData.Cars : null;

  //comento la función porque veo que no se está llamando. Fer
  // function closer() {
  //   setTimeout(() => {
  //     navigate(-1);
  //   }, 3000);
  // }

  return (
    <div className="container" style={{ minHeight: "600px" }}>
      {/* aquí mostramos las patentes de los vehículos del Propietario*/}
      <h2 className="my-4">Bienvenido, {name}!</h2>
      <div className="d-flex justify-content-center align-items-center">
        <div className="container border rounded shadow col-sm-7 py-3 justify-content-center align-items-center">
          <ul style={{ listStyle: "none" }} className="container">
            <p className="fs-5">Mis Vehículos:</p>
            {cars &&
              cars.map((car) => (
                <li key={car.id}>
                  <div className="d-flex justify-content-center">
                    {" "}
                    {/* Aplicamos estilos de centrado horizontal */}
                    <div
                      className="border border-black border-2 rounded my-2"
                      style={{ width: "200px", textAlign: "center" }}
                    >
                      <div
                        style={{ height: "20px", backgroundColor: "blue" }}
                      ></div>
                      <div>
                        <Link
                          to={`/home/user/${car.id}?type=car`}
                          style={{ color: "black" }}
                          className="fs-4"
                        >
                          {car.patent}
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Home;
