import React, { useEffect, useState } from "react";
import { realtimeDB } from "../../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import neumatico from "../../assets/neumatico.gif";
//import "../styles/Modal.css"; // Estilos del modal
import "./styles/Modal.css";
const Servicios = () => {
  const [servicesData, setServicesData] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // Referencia al nodo 'services' en la base de datos
    const servicesRef = ref(realtimeDB, "services");

    // Suscribe un observador para escuchar cambios en 'services'
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();

      const serviceVisible = {}; // Objeto para almacenar los elementos visibles

      // Iterar sobre las claves del objeto
      Object.keys(data).forEach((key) => {
        const elemento = data[key];
        if (elemento.visible) {
          // Agregar elemento al objeto historyVisible
          serviceVisible[key] = elemento;
        }
      });

      setServicesData(serviceVisible);
    });

    // Función de limpieza al desmontar el componente
    return () => {
      unsubscribe(); // Desconecta el observador cuando el componente se desmonta
    };
  }, []); // Ejecuta el efecto solo una vez al montar el componente

  const openModal = (serviceKey) => {
    setSelectedService(servicesData[serviceKey]);
    setIsModalOpen(true);
    console.log("modal " + isModalOpen);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container">
      <h2 style={{ marginTop: "30px" }}>Nuestros servicios</h2>
      <div className="row align-items-center justify-content-center">
        {servicesData ? (
          Object.keys(servicesData).map((serviceKey) => (
            <div key={serviceKey} className="col-sm-6 col-md-4 col-lg-2">
              <div style={{ height: "60px", marginTop: "30px" }}>
                <p>{servicesData[serviceKey].title}</p>
              </div>
              <div
                style={{
                  width: "120%",
                  paddingTop: "200%",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      clipPath: "polygon(0% 0%, 75% 0%, 100% 100%, 25% 100%)",
                    }}
                    onClick={() => openModal(serviceKey)} // Abrir modal al hacer clic en la imagen
                  >
                    <img
                      src={servicesData[serviceKey].url}
                      alt=""
                      className="img-fluid"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        filter: "drop-shadow(6px 6px 10px rgba(50, 50, 0, 0.5)",
                        cursor: "pointer", // Cambiar el tipo de puntero
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="container">
            <img src={neumatico} alt="Cargando datos ..." />
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <h3>{selectedService.title}</h3>
            <p>{selectedService.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicios;
