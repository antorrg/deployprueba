import React, { useState } from "react";
import ImageLanding from "./ImageLanding ";
import ImageCarrusel from "./ImageCarrusel";
import CommerceEdit from "./CommerceEdit";
import DefaultText from "./DefaultText";
import DivButtonCustom from "./DivButtonCustom";
import TipsEdit from "./TipsEdit";

function Customize() {
  const [showComponent, setShowComponent] = useState({
    principal: false,
    carrusel: false,
    historia: false,
    servicios: false,
    tips: false,
    comercio: false,
  });

  // Array de componentes que pueden mostrarse
  const components = [
    showComponent.principal && <ImageLanding />,
    showComponent.carrusel && <ImageCarrusel />,
    showComponent.comercio && <CommerceEdit />,
    showComponent.tips && <TipsEdit />,
    // Agregar más componentes aquí según sea necesario
  ];

  // Comprueba si al menos uno de los componentes está presente para mostrar el DefaultText
  const shouldShowDefaultText = !components.some((component) => component);

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

      <div className="row gap-3 py-3 m-2">
        <DivButtonCustom
          className="bg-success bg-gradient"
          onClick={() => handleClick("principal")}
        >
          Principal
        </DivButtonCustom>
        <DivButtonCustom
          className="bg-primary bg-gradient"
          onClick={() => handleClick("carrusel")}
        >
          Carrusel
        </DivButtonCustom>
        <DivButtonCustom className="bg-danger bg-gradient">
          Historia
        </DivButtonCustom>
        <DivButtonCustom className="bg-warning bg-gradient">
          Servicios
        </DivButtonCustom>
        <DivButtonCustom
          className="bg-secondary bg-gradient"
          onClick={() => handleClick("tips")}
        >
          Tips
        </DivButtonCustom>
        <DivButtonCustom
          className="bg-info bg-gradient"
          onClick={() => handleClick("comercio")}
        >
          Comercio
        </DivButtonCustom>
      </div>
      <div
        className="container border border-2 p-3 my-3 rounded"
        style={{ minHeight: "200px" }}
      >
        {showComponent.principal
          ? showComponent.principal && <ImageLanding />
          : null}
        {showComponent.carrusel
          ? showComponent.carrusel && <ImageCarrusel />
          : null}
        {showComponent.tips ? showComponent.tips && <TipsEdit /> : null}
        {showComponent.comercio
          ? showComponent.comercio && <CommerceEdit />
          : null}
        {/* Mostrar el componente DefaultText si ninguno de los componentes anteriores está visible */}
        {shouldShowDefaultText && <DefaultText />}
      </div>
    </div>
  );
}

export default Customize;
