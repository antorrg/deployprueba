import React from "react";
import logoAgencia from "../../../public/logoAgencia.png";
function Agencia() {
  return (
    <div
      className="container text-light bg-secondary bg-gradient"
      style={{ minHeight: "50px" }}
    >
      Desarrollado con pasión por{" "}
      <a href="">
        <img
          src={logoAgencia}
          alt="Logo Agencia"
          className="my-3"
          style={{ width: "100px" }}
        />
      </a>
    </div>
  );
}

export default Agencia;
