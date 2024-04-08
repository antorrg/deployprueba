import React, { useState, useEffect } from "react";
import firebase from "firebase/app";
import "firebase/database";

// Configura la conexión a Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  databaseURL: "TU_DATABASE_URL",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID",
};

// Inicializa Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // si ya tienes una instancia de firebase, úsala
}

const ServicesConfig = () => {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    // Referencia al nodo 'services' en la base de datos
    const servicesRef = firebase.database().ref("services");

    // Suscribe un observador para escuchar cambios en 'services'
    servicesRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setServicesData(data);
    });

    // Función de limpieza al desmontar el componente
    return () => {
      servicesRef.off(); // Desconecta el observador cuando el componente se desmonta
    };
  }, []); // Ejecuta el efecto solo una vez al montar el componente

  return (
    <div>
      <h2>Servicios</h2>
      {servicesData ? (
        <ul>
          {Object.keys(servicesData).map((serviceKey) => (
            <li key={serviceKey}>
              <h3>{`Service ${serviceKey}`}</h3>
              <p>Data: {servicesData[serviceKey].data}</p>
              <p>Number: {servicesData[serviceKey].number}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default ServicesConfig;
