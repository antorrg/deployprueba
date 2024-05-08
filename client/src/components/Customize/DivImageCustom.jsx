import React from "react";

function DivImageCustom({
  image,
  index,
  refItem,
  handleImageClick,
  handleFileChange,
  handleDeleteImage,
}) {
  const deleteImg = (refItem) => {
    handleDeleteImage(refItem);
  };

  return (
    /*si el div muestra una imagen, al hacerle clic no ejecutará nada (null). Si no hay imagen, el div estará vacío y con el signo + entonces podré hacer clic para cargar una nueva imagen*/
    <div
      key={index}
      className={"container d-flex justify-content-center align-items-center"}
      style={{
        width: "150px",
        height: "150px",
        border: "1px solid black",
        borderRadius: "5px",
        cursor: image ? "auto" : "pointer",
        position: "relative",
        overflow: "hidden",
        backgroundSize: "cover",
        backgroundPosition: "center",
        margin: "10px",
        backgroundImage: image ? `url(${image})` : "none",
        backgroundColor: image ? "none" : "lightgray",
      }}
      onClick={() => (image ? null : handleImageClick(index))}
    >
      {/* si hay imagen, mostrará la papelera para que se pueda eliminar esa imagen*/}
      {image ? (
        <div
          style={{
            position: "absolute",
            width: "30px",
            height: "30px",
            top: "5px",
            right: "5px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
            alignContent: "center",
            justifyItems: "center",
            boxShadow: "2px 2px 6px rgba(0, 0, 0, 0.5)",
            cursor: "pointer",
          }}
        >
          <i
            className="bi bi-trash3"
            style={{
              color: "red",
            }}
            onClick={() => deleteImg(refItem)}
          ></i>
        </div>
      ) : (
        <i class="bi bi-plus-lg"></i>
      )}
      {/* Icono de carga de imagen */}
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

export default DivImageCustom;
