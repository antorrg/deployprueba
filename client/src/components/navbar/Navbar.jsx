import style from "./Navbar.module.css";
import {useState} from 'react'
import { NavLink, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Link, animateScroll as scroll } from "react-scroll";
import { useAuth } from "../Auth/AuthContext/AuthContext";
import { AdminLink, LoginLinks, PanelAdmin } from "./Links/Index";
import ShowUser from "./ShowUser/ShowUser";
import logo from "../../assets/images/BoscarolHnos.png";
import userLogo from "../../assets/images/user.png";

const Navbar = () => {
  const { authenticated, user, logout } = useAuth();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  //Logica para hacer que aparezca ingresar en la hamburguesa:
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const admin = user?.role === 0 ? true : false;
  const noRoutes =
    pathname.startsWith("/login") ||
    pathname.startsWith("/error") ||
    pathname.startsWith("/home") ||
    pathname.startsWith("tips")
      ? false
      : true;

  const handleClick = () => {
    logout();
  };

  const toLogin = () => {
    if (!authenticated && pathname === "/") navigate("/login");
  };

  return (
    <div className={style.nav}>
      <div className={style.logo}>
        <NavLink to="/">
          <img
            src={logo}
            alt="Logo Taller Boscarol"
            className={style.logoImg}
          />
        </NavLink>
      </div>

      <div className={style.login}>
        {authenticated && location.pathname !== "/" ? (
          <>
            <NavLink to="/">
              <h3 className={style.linksH3}>Home</h3>{" "}
            </NavLink>
            {admin && noRoutes ? (
              <>
                <PanelAdmin />
              </>
            ) : null}
          </>
        ) : (
          <>
            {" "}
            <Link
              to="/"
              activeClass="active"
              smooth="true"
              duration={600}
              offset={-70}
              activeStyle={{ color: "red" }}
            >
              <h3 className={style.linksH3}>Home</h3>{" "}
            </Link>
            <Link
              to="historia"
              activeClass="active"
              smooth="true"
              duration={600}
              offset={-70}
              activeStyle={{ color: "red" }}
            >
              {" "}
              <h3 className={style.linksH3}>Historia</h3>{" "}
            </Link>
            <Link
              to="servicios"
              activeClass="active"
              smooth="true"
              duration={600}
              offset={-70}
              activeStyle={{ color: "red" }}
            >
              {" "}
              <h3 className={style.linksH3}>Servicios</h3>{" "}
            </Link>
            <Link
              to="consejos"
              activeClass="active"
              smooth="true"
              duration={600}
              offset={-70}
              activeStyle={{ color: "red" }}
            >
              {" "}
              <h3 className={style.linksH3}>Tips</h3>{" "}
            </Link>
            <Link
              to="contacto"
              activeClass="active"
              smooth="true"
              duration={600}
              offset={-70}
            >
              {" "}
              <h3 className={style.linksH3}>Contacto</h3>{" "}
            </Link>
          </>
        )}
      </div>

      <div className={style.userData}>
        {!authenticated && pathname === "/" ? (
          <button
            className={`btn btn-secondary ${style.dropDownButton}`}
            type="button"
            onClick={toLogin}
          >
            <img src={userLogo} className={style.userLogo} />
          </button>
        ) : (
          <div className="dropdown">
            <button
              className={`btn btn-secondary ${
                authenticated
                  ? style.dropDownButtonHidden
                  : style.dropDownButton
              }`}
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              {authenticated ? (
                <ShowUser />
              ) : (
                <img src={userLogo} className={style.userLogo} />
              )}
            </button>
            <ul className={`dropdown-menu ${style.dropdownMenu}`}>
              <LoginLinks />
              <AdminLink />
              <li>
                {authenticated ? (
                  <a className={style.out} href="/" onClick={handleClick}>
                    Salir
                  </a>
                ) : null}
              </li>
            </ul>
          </div>
        )}
      </div>

      <button
        className={`navbar-toggler ${style.userDetails}`}
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasDarkNavbar"
        aria-controls="offcanvasDarkNavbar"
        aria-label="Toggle navigation"
        onClick={() => setIsMenuOpen(!isMenuOpen)} // Toggle para abrir/cerrar el menú
      >
        <span className={style.togglerIcon}>&#9776;</span>
      </button>
      <div
        className="offcanvas offcanvas-end text-bg-dark"
        tabIndex="-1"
        id="offcanvasDarkNavbar"
        aria-labelledby="offcanvasDarkNavbarLabel"
        backdrop="false"
      >
        <div className={`offcanvas-header ${style.divHeader}`}>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
          <h2
            className={`offcanvas-title ${style.titleDeployMenu}`}
            id="offcanvasDarkNavbarLabel"
          ></h2>
        </div>
        <div className="offcanvas-body">
          <br></br>

          <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              {authenticated ? `Bienvenido ${user.nickname}` : null}
            </h5>
            <li className={`nav-item ${style.divPic}`}>
              {authenticated && (
                <img
                  className={style.pictureDeployMenu}
                  src={user.picture}
                  alt="Not Found"
                />
              )}
            </li>
             {authenticated ? null : (
              <>
                <li className="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink to="/login">
                    <a className={style.out} aria-current="page" href="#">
                      Ingreso
                    </a>
                  </NavLink>
                </li>
              </>
            )} 
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <LoginLinks />
            </li>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              <AdminLink />
            </li>
            <br></br>
            <li className="nav-item" data-bs-dismiss="offcanvas">
              {authenticated ? (
                <a className={style.out} href="/" onClick={handleClick}>
                  Salir
                </a>
              ) : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
