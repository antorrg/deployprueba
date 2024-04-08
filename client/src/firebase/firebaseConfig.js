// Import the functions you need from the SDKs you need
//app Boscarol Servicios en el proyecto Boscarol de Firebase

import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"; //almacenamiento de imágenes
import { getDatabase } from "firebase/database"; //realtime database para los Servicios

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: `${import.meta.env.VITE_API_KEY}`,
  authDomain: `${import.meta.env.VITE_AUTH_DOMAIN}`,
  projectId: `${import.meta.env.VITE_PROJECT_ID}`,
  storageBucket: `${import.meta.env.VITE_STORAGE_BUCKET}`,
  messagingSenderId: `${import.meta.env.VITE_MESSAGING_SENDER_ID}`,
  appId: `${import.meta.env.VITE_APP_ID}`,
  measurementId: `${import.meta.env.VITE_MEASUREMENT_ID}`,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const imagesDB = getStorage(app);
export const realtimeDB = getDatabase();
