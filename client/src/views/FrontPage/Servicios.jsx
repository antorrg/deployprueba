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
    // console.log("modal " + isModalOpen);
  };

  const closeModal = () => {
    setSelectedService(null);
    setIsModalOpen(false);
  };

  return (
    <div className="container align-items-center justify-content-center my-5">
      <h2 className="my-3">Nuestros servicios</h2>
      <div className=" row align-items-center justify-content-center my-3">
        {servicesData ? (
          Object.keys(servicesData).map((serviceKey) => (
            <div
              key={serviceKey}
              className="col-7 col-lg-2 col-md-2 col-sm-7 align-items-center justify-content-ceter "
            >
              <div style={{ height: "80px" }} className="">
                <p>{servicesData[serviceKey].title}</p>
              </div>
              <div
                className="mb-2"
                style={{
                  width: "120%",
                  paddingTop: "200%",
                  position: "relative",
                  overflow: "hidden",
                  // left: "-10%",
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
                    perspective: "100px",
                  }}
                  onClick={() => openModal(serviceKey)} // Abrir modal al hacer clic en la imagen
                >
                  <img
                    src={servicesData[serviceKey].url}
                    alt=""
                    className="img-fluid "
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      cursor: "pointer",
                      transition: "transform 0.5s",
                    }}
                    onMouseOver={(e) =>
                      (e.target.style.transform = "translateZ(10px)")
                    }
                    onMouseOut={(e) => (e.target.style.transform = "none")}
                  />
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
            <div
              className="container d-flex justify-content-center align-items-center overflow-hidden"
              style={{ maxWidth: "500px", maxHeight: "200px" }}
            >
              <img
                src={selectedService.url}
                alt={`img${selectedService.title}`}
                style={{
                  opacity: "0.4",
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
            <p>{selectedService.description}</p>
            <p style={{ fontSize: "smaller" }}>{selectedService.data}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Servicios;
