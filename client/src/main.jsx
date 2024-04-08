import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "./components/Auth/AuthContext/AuthContext";
import axios from "axios";

const apiUrl = import.meta.env.VITE_URL;

axios.defaults.baseURL = apiUrl;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        <ToastContainer />
        </BrowserRouter>
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
