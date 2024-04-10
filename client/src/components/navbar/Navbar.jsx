import style from './Navbar.module.css'
import { NavLink, useLocation } from 'react-router-dom'
import { Link, animateScroll as scroll, } from 'react-scroll';
import { useState } from 'react'
import { useAuth } from '../Auth/AuthContext/AuthContext'
import LoginLinks from './Links/LoginLinks'
import AdminLink from './Links/AdminLink'
import ShowUser from './ShowUser/ShowUser'
import logo from '../../assets/images/BoscarolHnos.png'
import userLogo from '../../assets/images/user.png'


const Navbar = () => {
  const { authenticated, user, logout } = useAuth()
  const location = useLocation()

  const handleClick = () => {
    logout();


  }






  return (
    <div className={style.nav}>

      <div className={style.logo}>
        <img src={logo} alt="" className={style.logoImg} />
      </div>

      <div className={style.login}>
        {authenticated && location.pathname!=='/' ?
        <>
        <NavLink to='/' activeClass="active"  smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}><h3 className={style.linksH3}>Home</h3> </NavLink>
        </> :
        <> <Link to="pagina" activeClass="active"  smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}><h3 className={style.linksH3}>Home</h3> </Link>

        <Link to="historia" activeClass="active"  smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}> <h3 className={style.linksH3}>Historia</h3> </Link>


        <Link to="servicios" activeClass="active"  smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}>   <h3 className={style.linksH3}>Servicios</h3> </Link>


        <Link to="consejos" activeClass="active" smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}>   <h3 className={style.linksH3}>Tips</h3> </Link>

        <Link to="contacto" activeClass="active"  smooth={true} duration={600} offset={-70} >  <h3 className={style.linksH3}>Contacto</h3> </Link> 
         </>}
        {/* <LoginLinks />
        <AdminLink /> */}




        {/* <Link to='/login'>
          <h4 className={style.botones}>Ingresar</h4>
        </Link> */}

      </div>

      <div className={style.userData}>

        <div class="dropdown">
          <button class={`btn btn-secondary ${authenticated ? style.dropDownButtonHidden : style.dropDownButton}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
            {(
              authenticated ? (
                <ShowUser />
              ) : (

                <img src={userLogo} className={style.userLogo} />
              )
            )}

          </button>
          <ul class={`dropdown-menu ${style.dropdownMenu}`}>
            <LoginLinks />
            <AdminLink />
            <li>
              {authenticated?
              <a className={style.out} href='/' onClick={handleClick}>Salir</a>
              :null}

            </li>
          </ul>
        </div>
      </div>



      <button className={`navbar-toggler ${style.userDetails}`} type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
        <span class={style.togglerIcon}>&#9776;</span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" backdrop={false}>
        <div class={`offcanvas-header ${style.divHeader}`}>

          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          <h2 class={`offcanvas-title ${style.titleDeployMenu}`} id="offcanvasDarkNavbarLabel"> Menú de Navegación</h2>
        </div>
        <div class="offcanvas-body">
          <br></br>

          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">



{/* 
            {authenticated ? null : (

              <>
                <li class="nav-item">
                  <Link to="pagina" data-bs-dismiss="offcanvas" activeClass="active" spy={true} smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}><h3 className={style.linksH3}>Home</h3> </Link>
                </li>
                <li class="nav-item">
                  <Link to="historia" data-bs-dismiss="offcanvas" activeClass="active" spy={true} smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}> <h3 className={style.linksH3}>Historia</h3> </Link>
                </li>
                <li class="nav-item">
                  <Link to="servicios" data-bs-dismiss="offcanvas" activeClass="active" spy={true} smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}>   <h3 className={style.linksH3}>Servicios</h3> </Link>
                </li>
                <li class="nav-item">
                  <Link to="consejos" data-bs-dismiss="offcanvas" activeClass="active" spy={true} smooth={true} duration={600} offset={-70} activeStyle={{ color: 'red' }}>   <h3 className={style.linksH3}>Tips</h3> </Link>
                </li>
                <li class="nav-item">
                  <Link to="contacto" data-bs-dismiss="offcanvas" activeClass="active" spy={true} smooth={true} duration={600} offset={-70} >  <h3 className={style.linksH3}>Contacto</h3> </Link>
                </li>
                <hr></hr>
              </>
            )
            } */}






            <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">
              {
                authenticated ? (`Bienvenido ${user.nickname}`) : null}
            </h5>
            <li class={`nav-item ${style.divPic}`}>
              {
                authenticated &&
                <img className={style.pictureDeployMenu} src={user.picture} alt="Not Found" />
              }
            </li>

            {authenticated ? (
              <>
                <br></br>
                <br></br>
              </>
            ) : (
              <>
                <li class="nav-item" data-bs-dismiss="offcanvas">
                  <NavLink to='/login'>
                    <a className={style.out} aria-current="page" href="#">Ingresar</a>
                  </NavLink>
                </li>
              </>
            )}

            <li class="nav-item" data-bs-dismiss="offcanvas">
              <LoginLinks />


            </li>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              <AdminLink />

            </li>

            <br></br>
            <li class="nav-item" data-bs-dismiss="offcanvas">
              {
                authenticated &&
                <a className={style.out} href='/' onClick={handleClick}>Salir</a>
              }
            </li>
          </ul>
        </div>
      </div>



      {/* {
        authenticated ? <>
          <div className={style.userDetails}>
            <h4>Bienvenido: {user.nickname && user.nickname}</h4>




            <img src={user.picture} alt="Not Found" />
            <a className={style.out} href='/' onClick={handleClick}>Salir</a>
          </div>
        </> : null
      } */}


    </div>
  )
}

export default Navbar