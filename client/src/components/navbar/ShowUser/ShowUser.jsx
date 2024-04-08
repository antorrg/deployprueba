import style from './ShowUser.module.css'
import { useAuth } from '../../Auth/AuthContext/AuthContext'

const ShowUser = () => {
  const { authenticated, user } = useAuth();
  return (
    <div>
      {authenticated ? <>
        <div className={style.userDetails}>
          <h4 className={style.h4}> {user.nickname && user.nickname}</h4>
          <img className={style.picture} src={user.picture} alt="Nor Found" />
        </div>
      </> : null
      }
    </div>
  )
}

export default ShowUser