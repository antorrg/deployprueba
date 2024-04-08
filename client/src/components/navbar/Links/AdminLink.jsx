import { NavLink, useLocation } from 'react-router-dom'
import { useAuth } from '../../Auth/AuthContext/AuthContext'
import style from './AdminLink.module.css'


const AdminLink = () => {
  const { authenticated, user } = useAuth()
  const { pathname } = useLocation();
  const isHome = pathname === '/home'; // Variable booleana para simplificar la lógica


  return (
    <div>
      <div>
        {authenticated && user.role !== 1 ? (
          <NavLink to={isHome ? '/admin' : '/home'}>
            <a className={style.out} aria-current="page" href="#">{isHome ? 'Admin' : 'Mi Usuario'}</a>

          </NavLink>
        ): authenticated ?
        <NavLink to={isHome ? null : '/home'}>
            <a className={style.out} aria-current="page" href="#">{isHome ? null : 'Mi Usuario'}</a>
          </NavLink>: null
          }
      </div>
    </div>
  )
}

export default AdminLink
