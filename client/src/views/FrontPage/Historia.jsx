import React, { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import neumatico from "../../assets/neumatico.gif";
import style from './styles/Historia.module.css'

//este subcomponente renderiza las imágenes
const DivImg = ({ index, url, title }) => {
  return (
    <div
      className="container m-3 col-sm-6"
      style={{
        width: "40%", // Ancho deseado del contenedor padre
        position: "relative",
      }}
    >
      <div
        style={{
          width: "100%",
          paddingBottom: "100%",
          overflow: "hidden",
          position: "relative",
          borderRadius: "50%",
          filter:
            index === 0 // Aplicar filtro solo a la primera imagen
              ? "drop-shadow(6px 6px 10px rgba(50, 50, 0, 0.5)) sepia(50%) saturate(150%) hue-rotate(15deg)"
              : "drop-shadow(6px 6px 10px rgba(50, 50, 0, 0.5))",
        }}
      >
        <img
          src={url}
          alt={title}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
};

//este subcomponente renderiza los títulos y descripción
const DivTitle = ({ title, description }) => {
  return (
    <div className="m-3 col-sm-6">
      <h2>{title}</h2>
      <p> {description} </p>
    </div>
  );
};

const Historia = () => {
  const [historyData, setHistoryData] = useState();
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  //useEffect controla el tamaño del screen para la renderización de imagen + título/descripción
  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    //referencia al nodo history en la BD
    const historyRef = ref(realtimeDB, "history");

    //suscribir un observador para escuchar cambios en el nodo
    const unsubscribe = onValue(historyRef, (snapshot) => {
      const data = snapshot.val();
      const historyVisible = {}; // Objeto para almacenar los elementos visibles

      // Iterar sobre las claves del objeto
      Object.keys(data).forEach((key) => {
        const elemento = data[key];
        if (elemento.visible) {
          // Agregar elemento al objeto historyVisible
          historyVisible[key] = elemento;
        }
      });
      setHistoryData(historyVisible);
    });

    return () => {
      unsubscribe(); //desconectar el observador cuando se desmonta el componente
    };
  }, []);

  return (

    <div className="container my-3 col-sm-12">

      {historyData && Object.keys(historyData).length > 0 ? (
        Object.keys(historyData).map((historyKey, index) =>
          index % 2 === 0 ? (
            <div
              className="d-flex flex-wrap align-items-center justify-content-center"
              key={historyKey}
            >
              {/*div de la imagen */}
              <DivImg
                index={index}
                url={historyData[historyKey].url}
                title={historyData[historyKey].title}
              />
              {/*div del título y descripción */}
              <DivTitle
                title={historyData[historyKey].title}
                description={historyData[historyKey].description}
              />
            </div>
          ) : screenWidth > 768 ? (
            <div
              className="d-flex flex-wrap align-items-center justify-content-center"
              key={historyKey}
            >
              {/*div del título y descripción */}
              <DivTitle
                title={historyData[historyKey].title}
                description={historyData[historyKey].description}
              />
              {/*div de la imagen */}
              <DivImg
                index={index}
                url={historyData[historyKey].url}
                title={historyData[historyKey].title}
              />
            </div>
          ) : (
            <div
              className="d-flex flex-wrap align-items-center justify-content-center border-top border-bottom"
              key={historyKey}
            >
              {/*div de la imagen */}
              <DivImg
                index={index}
                url={historyData[historyKey].url}
                title={historyData[historyKey].title}
              />
              {/*div del título y descripción */}
              <DivTitle
                title={historyData[historyKey].title}
                description={historyData[historyKey].description}
              />
            </div>
          )
        )
      ) : (
        <div className="container">
          <img src={neumatico} alt="Cargando datos ..." />
        </div>
      )}
    </div>
  );
};

export default Historia;
