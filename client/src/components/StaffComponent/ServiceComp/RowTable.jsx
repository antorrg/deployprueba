import style from '../generalStyles/ServicesComponents/Row.module.css'
import {Link, useNavigate, useLocation} from 'react-router-dom'

const RowTable = ({data}) => {
const {id, type, date_in, date_out,createdAt, Car}= data;
  const navigate= useNavigate()
  const location = useLocation()
  const pathServ = location.pathname.split('/')[1];
 const att= Car?.patent
  const allow = typeof id === 'boolean' ? true : false;
 
//Funciones de edicion para los botones: 
    const handleClick = ()=>{
      navigate(`/${pathServ}/detailservice/${id}`)
    }
  
  return (
    <div className={style.row}>
      <div>
      <h5>Patente: </h5>
      {att}
    </div>
   <div>
      <h5>Tipo: </h5>
      {type}
    </div>
    <div>
      <h5>Entra: </h5>
      {date_in}
    </div>
    <div>
      <h5>Sale: </h5>
      {date_out}
    </div>
    <div>
      <h5>Servicio Creado: </h5>
      {createdAt}
    </div>
    <button onClick={handleClick} disabled= {allow}>Detalles del servicio</button>

    </div>
  )
}

export default RowTable