import style from './styles/User.module.css'
import {infoSelect} from '../AdminHelpers/Helpers/InfoMap'
import {Link}from 'react-router-dom'

const User = ({data}) => {
  const {id, email, name, picture, typeId, numberId, enable, Cars}=data
  
  const usuario= (data)=>{
    if (data=== true){
      return 'Activo'
    }else{
      return 'Bloqueado'
    }
  }
 const vehiculos = infoSelect(Cars)
  return (
    <div className={style.cardContainer}>
    <p>Nombre: {name}</p>
    <Link to= {`/admin/dett/${id}?type=user`}>Ver mas:</Link>
    <p>Email: {email}</p>
    <p>Estado: {usuario(enable)}</p>
    <div>
      <p>Vehiculos:</p>
    {vehiculos?.map((vehiculo, index) => (
    <span key={index}>
    <Link to={`/admin/dett/${vehiculo.id}?type=car`}>Vehiculo pat: {vehiculo.name}</Link>
    {index !== vehiculos.length - 1 ? ', ' : ''}
    </span>
        ))}
    </div>
    </div>
  )
}

export default User

