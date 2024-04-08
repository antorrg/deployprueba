import interceptor from "./Interceptor";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Error, Home, Detail, Landing, Login, EditWindow, } from "./views/Index";
import { Admin, DetailAd, DetailService } from "./views/Staff/AdminIndex";
import { loginUser, isNotAuth, isMyCommerce } from "./redux/actions";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "./components/Auth/AuthContext/AuthContext";
import "./App.css";
import Customize from "./components/Customize/Customize";
import Navbar from "./components/navbar/Navbar";
import Footer from "./views/FrontPage/Footer";
import Tips from "./views/Tips/Tips";

function App() {
  const { authenticated, user, logout } = useAuth();
  const dispatch = useDispatch();

  //console.log(authenticated)
  const allow = user ? user.role : 1;
  //console.log(allow)

  useEffect(() => {
    if (authenticated) {
      dispatch(loginUser(user));
    } else {
      dispatch(isNotAuth());
    }
  }, [authenticated]);

  useEffect(() => {
    // Configurar el interceptor cuando el componente se monta
    interceptor(logout);
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/customize" element={<Customize />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path={"/error"} element={<Error />} />
        <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/" />} />
        <Route path="/home/detail/:id" element={authenticated ? <Detail /> : <Navigate to="/" />} />
        <Route path="/home/detailservice/:id" element={authenticated ? <DetailService /> : <Navigate to="/" />} />
        <Route path="/home/user/:id" element={authenticated ? <DetailAd /> : <Navigate to="/home" />}/>
        <Route path="/admin/detailservice/:id" element={authenticated ? <DetailService /> : <Navigate to="/home" />}/>
        <Route exact path="/admin" element={(authenticated && allow === 0) || (authenticated && allow === 2) ? ( <Admin /> ) : ( <Navigate to="/home" />)}/>
        <Route path="/admin/:name" element={(authenticated && allow === 0) || (authenticated && allow === 2) ? (<Admin />) : (<Navigate to="/error" />) }/>
        <Route path="/admin/dett/:id" element={(authenticated && allow === 0) || (authenticated && allow === 2) ? ( <DetailAd />) : (<Navigate to="/error" />)}/>
        <Route path={"*"} element={<Navigate to="/error" />} />
        <Route path="tips" element={<Tips />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
