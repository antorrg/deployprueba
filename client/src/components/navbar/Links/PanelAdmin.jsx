import style from '../Navbar.module.css'
import {useLocation, NavLink} from 'react-router-dom'

const PanelAdmin = () => {
    const location = useLocation()
    
  return (
    <div className={style.login}>
    {(location.pathname === '/admin/customize')?
     <NavLink to= '/admin'><h3 className={style.linksH3}>Volver</h3></NavLink>:
     <NavLink to= '/admin/customize' ><h3 className={style.linksH3}>Personalizar</h3></NavLink>}
     {(location.pathname === '/admin/providers')?
     <NavLink to= '/admin' ><h3 className={style.linksH3}>Volver</h3></NavLink>:
     <NavLink to= '/admin/providers' ><h3 className={style.linksH3}>Proveedores</h3></NavLink>}
     {(location.pathname === '/admin/services')?
     <NavLink to= '/admin'><h3 className={style.linksH3}>Volver</h3></NavLink>:
     <NavLink to= '/admin/services' ><h3 className={style.linksH3}>Servicios</h3></NavLink>}
    </div>
  )
}

export default PanelAdmin