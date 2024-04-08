import React, { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import neumatico from "../../assets/neumatico.gif";

const Historia = () => {
  const [historyData, setHistoryData] = useState();

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
    <div className="container">
      {historyData && Object.keys(historyData).length > 0 ? (
        Object.keys(historyData).map((historyKey, index) =>
          index % 2 === 0 ? (
            <div
              key={historyKey}
              style={{
                display: "flex",
                alignItems: "center", // Centra verticalmente
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "500px",
                  height: "500px",
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
                  src={historyData[historyKey].url}
                  alt={historyData[historyKey].title}
                  style={{
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "cover", // Evita que la imagen se estire y mantiene su relación de aspecto
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: "20px",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", // Centra horizontalmente y verticalmente
                }}
              >
                <h2 style={{ textAlign: "center" }}>
                  {historyData[historyKey].title}
                </h2>
                <p style={{ textAlign: "center" }}>
                  {historyData[historyKey].description}
                </p>
              </div>
            </div>
          ) : (
            <div
              key={historyKey}
              style={{
                display: "flex",
                alignItems: "center", // Centra verticalmente
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  marginRight: "20px",
                  flex: "1",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", // Centra horizontalmente y verticalmente
                }}
              >
                <h2 style={{ textAlign: "center" }}>
                  {historyData[historyKey].title}
                </h2>
                <p style={{ textAlign: "center" }}>
                  {historyData[historyKey].description}
                </p>
              </div>
              <div
                style={{
                  width: "500px",
                  height: "500px",
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
                  src={historyData[historyKey].url}
                  alt={historyData[historyKey].title}
                  style={{
                    minWidth: "100%",
                    minHeight: "100%",
                    objectFit: "cover", // Evita que la imagen se estire y mantiene su relación de aspecto
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                />
              </div>
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
