import React, { useState } from "react";
import { imagesDB } from "../../firebase/firebaseConfig";
import GenericButton from "../GenericButton/GenericButton";
import { ref, uploadBytes } from "firebase/storage";
import ImageLanding from "./ImageLanding ";
import ImageCarrusel from "./ImageCarrusel";

// Componente para definir el estilo común de los elementos <div>
function CustomDiv({ className, children, onClick }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`col text-light py-3 rounded custom-col ${className}`}
      style={{
        cursor: "pointer",
        boxShadow: isHovered
          ? "0 0 10px rgba(0, 0, 0, 0.5)"
          : "6px 6px 10px rgba(0, 0, 0, 0.5)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

function Customize() {
  const [showComponent, setShowComponent] = useState({
    principal: false,
    carrusel: false,
    historia: false,
    servicios: false,
    tips: false,
    comercio: false,
  });

  const handleClick = (nameComponent) => {
    setShowComponent((prevShowComponent) => {
      const updatedShowComponent = {};
      for (const key in prevShowComponent) {
        updatedShowComponent[key] = key === nameComponent;
      }
      return updatedShowComponent;
    });
  };

  return (
    <div className="container">
      <div style={{ height: "200px" }} className="py-3"></div>
      <h3>Personaliza tu app</h3>

      <div className="row gap-3 py-3">
        <CustomDiv
          className="bg-success bg-gradient"
          onClick={() => handleClick("principal")}
        >
          Principal
        </CustomDiv>
        <CustomDiv
          className="bg-primary bg-gradient"
          onClick={() => handleClick("carrusel")}
        >
          Carrusel
        </CustomDiv>
        <CustomDiv className="bg-danger bg-gradient">Historia</CustomDiv>
        <CustomDiv className="bg-warning bg-gradient">Servicios</CustomDiv>
        <CustomDiv className="bg-secondary bg-gradient">Tips</CustomDiv>
        <CustomDiv className="bg-info bg-gradient">Comercio</CustomDiv>
      </div>
      <div className="container border p-3 radius">
        {showComponent.principal
          ? showComponent.principal && <ImageLanding />
          : null}
        {showComponent.carrusel
          ? showComponent.carrusel && <ImageCarrusel />
          : null}
      </div>
    </div>
  );
}

export default Customize;
