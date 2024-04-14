import React, { useState } from "react";

// Componente para definir el estilo común de los elementos <div>
function DivButtonCustom({ className, children, onClick }) {
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

export default DivButtonCustom;
