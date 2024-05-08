import style from "./Error.module.css";
import { Link } from "react-router-dom";
import errorImg from "../../assets/error404a.jpg";

const Error = () => {
  return (
    <div
      className="container"
      style={{
        minHeight: "600px",
        backgroundImage: `url(${errorImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="py-4">
        <span className="fs-4">Ups!, adónde vamos?</span>
      </div>
      <div className="py-4">
        <Link to="/">
          <span className="fs-4">
            <i className="bi bi-caret-left-fill text-black"></i>
            <i className="bi bi-caret-left-fill text-black"></i>
            <i className="bi bi-caret-left-fill text-black"></i>
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Error;
