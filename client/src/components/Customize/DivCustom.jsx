import React from "react";

function DivCustom({ image, index, handleImageClick, handleFileChange }) {
  return (
    <div
      key={index}
      className={"container d-flex justify-content-center align-items-center"}
      style={{
        width: "150px",
        height: "150px",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "5px",
        backgroundImage: image ? `url(${image})` : "none",
        backgroundColor: image ? "none" : "lightgray",
      }}
      onClick={() => handleImageClick(index)}
    >
      {image ? null : "+"} {/* Icono de carga de imagen */}
      <input
        type="file"
        id={`fileInput${index}`}
        accept=".jpg, .jpeg, .png"
        style={{ display: "none" }}
        onChange={(e) => handleFileChange(index, e)}
      />
    </div>
  );
}

export default DivCustom;
