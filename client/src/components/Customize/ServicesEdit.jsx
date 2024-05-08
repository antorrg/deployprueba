import React, { useState, useEffect } from "react";
import TitleSegment from "./TitleSegment";
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

function ServicesEdit() {
  const [servicesData, setServicesData] = useState();

  //Datos para mostrar en el encabezado de la sub sección
  const title = "Personaliza la sección Servicios";
  const detail =
    "Tendrás un máximo de cinco bloques para contar a los visitantes brevemente los servicios que prestas en tu taller. Una vez que realices modificaciones por cada apartado, recuerda guardarlos antes de salir.";

  //configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
  const minWidthAccepted = 100;
  const maxWidthAccepted = 1000;
  const minHeightAccepted = 100;
  const maxHeigthAccepted = 1000;
  const minSizeKBaccepted = 30;
  const maxSizeKBaccepted = 800;

  //configuramos longitudes de cadenas (caracteres) para los input
  const maxLengthTitle = 32;
  const maxLengthText = 350;
  const maxLengthData = 80;

  useEffect(() => {
    //referencia al nodo history en la BD
    const servicesRef = dbRef(realtimeDB, "services");
    //suscribir un observador para escuchar cambios en el nodo
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      setServicesData(data);
      console.log(data);
    });
    return () => {
      unsubscribe(); //desconectar el observador cuando se desmonta el componente
    };
  }, []);

  const handleClicImg = (event, serviceKey) => {
    document.getElementById(`imgFIle${serviceKey}`).click();
  };

  const handleFileChange = async (event, serviceKey) => {
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
      const fileRef = ref(storageRef, `servicios/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      setServicesData((prevServicesData) => ({
        ...prevServicesData,
        [serviceKey]: {
          ...prevServicesData[serviceKey],
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

  const handleChange = (event, serviceKey) => {
    const key = event.target.name;
    let value = event.target.value;
    // Si es un checkbox, establece el valor como el estado del checkbox
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    setServicesData((prevServiceData) => ({
      ...prevServiceData,
      [serviceKey]: {
        ...prevServiceData[serviceKey],
        [key]: value,
      },
    }));
  };

  // handler para almacenar los datos en la BD realtime
  const handleSubmit = async (e, serviceKey) => {
    e.preventDefault();
    try {
      set(
        dbRef(realtimeDB, "services/" + serviceKey),
        servicesData[serviceKey]
      );
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
        {servicesData && Object.keys(servicesData).length > 0 ? (
          Object.keys(servicesData).map((serviceKey, index) => (
            <div
              key={index}
              className="border border-warning rounded row my-3 shadow"
            >
              <div className="col-md-4  my-3 ">
                <div
                  style={{
                    width: "100%",
                    paddingBottom: "100%",
                    overflow: "hidden",
                    position: "relative",
                    clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)",
                  }}
                >
                  <img
                    src={servicesData[serviceKey].url}
                    alt={`img${servicesData[serviceKey].title}`}
                    name={`img ${servicesData[serviceKey].title}`}
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
                    onClick={(event) => handleClicImg(event, serviceKey)}
                  />
                </div>
              </div>
              <div className="col-md-8 my-3">
                <form
                  class="row g-3 m-3 needs-validation"
                  onSubmit={(e) => handleSubmit(e, serviceKey)}
                  novalidate
                >
                  <input
                    type="text"
                    name="title"
                    placeholder="Título del servicio"
                    value={servicesData[serviceKey].title}
                    class="form-control"
                    required
                    maxLength={maxLengthTitle}
                    onChange={(event) => handleChange(event, serviceKey)}
                  />
                  <textarea
                    name="description"
                    placeholder="Descripción del servicio"
                    value={servicesData[serviceKey].description}
                    class="form-control"
                    required
                    maxLength={maxLengthText}
                    rows={6}
                    onChange={(event) => handleChange(event, serviceKey)}
                  />
                  <span
                    className="text-end fst-italic mt-0"
                    style={{ fontSize: "smaller" }}
                  >{`${servicesData[serviceKey].description.length} de ${maxLengthText}`}</span>
                  <input
                    type="text"
                    name="data"
                    placeholder="Nota adicional..."
                    value={servicesData[serviceKey].data}
                    class="form-control"
                    // required
                    maxLength={maxLengthData}
                    onChange={(event) => handleChange(event, serviceKey)}
                  />
                  <span
                    className="text-end fst-italic mt-0"
                    style={{ fontSize: "smaller" }}
                  >{`${servicesData[serviceKey].data.length} de ${maxLengthData}`}</span>
                  <div class="form-check d-flex flex-row align-items-center">
                    <input
                      class="form-check-input mx-1"
                      type="checkbox"
                      checked={servicesData[serviceKey].visible}
                      id="flexCheckDefault"
                      name="visible"
                      onChange={(event) => handleChange(event, serviceKey)}
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
                      id={`imgFIle${serviceKey}`}
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                      onChange={(event) => handleFileChange(event, serviceKey)}
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

export default ServicesEdit;
