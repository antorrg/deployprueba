import style from './Error.module.css'
import {Link} from 'react-router-dom'

const Error = () => {
  return (
    <div className={style.generalContainer}>
    <div className={style.errorContainer}>
    <div className={style.error}>
      <h1>Error 404</h1>
      <h2>Page not found</h2>
      <Link to='/'><h3>Regresar:</h3></Link>
    </div>
    </div>
    </div>
  )
}

export default Error