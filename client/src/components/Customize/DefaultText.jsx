import React from "react";

// Define la animación bounce
const bounceKeyframes = `
  @keyframes bounce {
    0% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
    100% { transform: translateY(0); }
  }
`;

function DefaultText() {
  return (
    <div
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "400px" }}
    >
      <style>{bounceKeyframes}</style>{" "}
      {/* Incluye la definición de la animación */}
      <p className="fs-5 text" style={{ animation: "bounce 2s infinite" }}>
        Selecciona una sección para editar
      </p>
    </div>
  );
}

export default DefaultText;
