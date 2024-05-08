import React, { useState, useEffect } from "react";
import { realtimeDB } from "../../firebase/firebaseConfig";
import { imagesDB } from "../../firebase/firebaseConfig";
import { ref as dbRef, onValue, set } from "firebase/database";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import neumatico from "../../assets/neumatico.gif";
import validateImage from "../utils/ImageValidator";
import Swal from "sweetalert2";
import TitleSegment from "./TitleSegment";

function HistoryEdit() {
  const [historyData, setHistoryData] = useState();

  //Datos para mostrar en el encabezado de la sub sección
  const title = "Personaliza la sección Historia";
  const detail =
    "Actualiza y adapta la Historia, Misión, Visión y Valores de tu organización. Ten en cuenta que en tu página principal, se le aplicará un efecto sepia a la primer imagen (idealmente Nuestra Historia). Una vez que realices modificaciones por cada apartado, recuerda guardarlos antes de salir.";

  //configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
  const minWidthAccepted = 100;
  const maxWidthAccepted = 800;
  const minHeightAccepted = 100;
  const maxHeigthAccepted = 800;
  const minSizeKBaccepted = 30;
  const maxSizeKBaccepted = 800;

  //configuramos longitudes de cadenas (caracteres) para los input
  const maxLengthTitle = 25;
  const maxLengthText = 350;

  useEffect(() => {
    //referencia al nodo history en la BD
    const historyRef = dbRef(realtimeDB, "history");

    //suscribir un observador para escuchar cambios en el nodo
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      setHistoryData(data);
    });
    return () => {
      unsubscribe(); //desconectar el observador cuando se desmonta el componente
    };
  }, []);

  const handleClicImg = (event, historyKey) => {
    document.getElementById(`imgFIle${historyKey}`).click();
  };
  const handleFileChange = async (event, historyKey) => {
    try {
      const file = event.target.files[0];
      // Verificar si se selecciona un archivo
      if (!file) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se seleccionó ningún archivo.",
        });
        return;
      }

      // Verificar si la extensión del archivo es válida
      const validExtensions = ["jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !validExtensions.includes(extension) ||
        file.type.indexOf("image/") !== 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg y png.",
        });
        return;
      }

      // Llama a la función de validación antes de subir la imagen
      //validamos ancho, alto y tamaño de la imagen. Si todo está bien continua la ejecución. Si no, va al bloque catch.
      await validateImage(
        file,
        minWidthAccepted,
        maxWidthAccepted,
        minHeightAccepted,
        maxHeigthAccepted,
        minSizeKBaccepted,
        maxSizeKBaccepted
      );

      //subir la imagen a una carpeta Storage
      const storageRef = ref(imagesDB);
      const fileRef = ref(storageRef, `historia/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      setHistoryData((prevHistoryData) => ({
        ...prevHistoryData,
        [historyKey]: {
          ...prevHistoryData[historyKey],
          url: url,
        },
      }));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de vuelta.",
      });
      return;
    }
  };

  const handleChange = (event, historyKey) => {
    const key = event.target.name;
    let value = event.target.value;
    // Si es un checkbox, establece el valor como el estado del checkbox
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    setHistoryData((prevHistoryData) => ({
      ...prevHistoryData,
      [historyKey]: {
        ...prevHistoryData[historyKey],
        [key]: value,
      },
    }));
  };

  // handler para almacenar los datos en la BD realtime
  const handleSubmit = async (e, historyKey) => {
    e.preventDefault();
    try {
      set(dbRef(realtimeDB, "history/" + historyKey), historyData[historyKey]);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se guardó correctamente",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log("Error al intentar guardar los datos en Firebase Realtime");
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Hubo un error, intenta de nuevo.",
      });
    }
  };

  return (
    <div className="container align-items-center justify-content-center">
      <TitleSegment title={title} detail={detail} />
      <div className="container col-md-12">
        {historyData && Object.keys(historyData).length > 0 ? (
          Object.keys(historyData).map((historyKey, index) => (
            <div
              key={index}
              className="border border-danger-subtle rounded row my-3 shadow"
            >
              <div className="col-md-4  my-3 ">
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    position: "relative",
                    borderRadius: "50%",
                  }}
                >
                  <img
                    src={historyData[historyKey].url}
                    alt={`img${historyData[historyKey].title}`}
                    name={`img ${historyData[historyKey].title}`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      cursor: "pointer",
                    }}
                    onClick={(event) => handleClicImg(event, historyKey)}
                  />
                </div>
              </div>
              <div className="col-md-8 my-3">
                <form
                  class="row g-3 m-3 needs-validation"
                  onSubmit={(e) => handleSubmit(e, historyKey)}
                  novalidate
                >
                  <input
                    type="text"
                    name="title"
                    value={historyData[historyKey].title}
                    class="form-control"
                    required
                    maxLength={maxLengthTitle}
                    onChange={(event) => handleChange(event, historyKey)}
                  />
                  <textarea
                    name="description"
                    value={historyData[historyKey].description}
                    class="form-control"
                    required
                    maxLength={maxLengthText}
                    rows={8}
                    onChange={(event) => handleChange(event, historyKey)}
                  />
                  <span
                    className="text-end fst-italic mt-0"
                    style={{ fontSize: "smaller" }}
                  >{`${historyData[historyKey].description.length} de ${maxLengthText}`}</span>
                  <div class="form-check d-flex flex-row align-items-center">
                    <input
                      class="form-check-input mx-1"
                      type="checkbox"
                      checked={historyData[historyKey].visible}
                      id="flexCheckDefault"
                      name="visible"
                      onChange={(event) => handleChange(event, historyKey)}
                    />
                    <label
                      class="form-check-label mx-1"
                      htmlFor="flexCheckDefault"
                    >
                      Mostrar en la web
                    </label>
                    <button class="btn btn-primary mx-3" type="submit">
                      Guardar
                    </button>
                    <input
                      type="file"
                      id={`imgFIle${historyKey}`}
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, historyKey)}
                    />
                  </div>
                </form>
              </div>
            </div>
          ))
        ) : (
          <div className="container">
            <img src={neumatico} alt="Cargando datos ..." />
          </div>
        )}
      </div>
    </div>
  );
}

export default HistoryEdit;
