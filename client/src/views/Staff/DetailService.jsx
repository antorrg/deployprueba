import {useNavigate, useParams} from 'react-router-dom'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import GenericButton from '../../components/GenericButton/GenericButton'
import {servicesById, cleanDetails} from '../../redux/actions'

const DetailService = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const service = useSelector((state)=>state.servById)
    const {id}=useParams();
    
    useEffect(()=>{
    dispatch(servicesById(id))
    return ()=>{
      dispatch(cleanDetails())
    }
    },[dispatch, id])
    const att= service.Car?.patent
  
  return (
    <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <h1>Servicio: </h1>
    <ul>
      <li>Patente: {att}</li>
      <li>Servicio Prestado: {service.type}</li>
      <li>Detalle:  {service.detail}</li>
      <li>Fecha entrada: {service.date_in}</li>
      <li>Fecha salida: {service.date_out}</li>
      <li>Registro creado: {service.createdAt}</li>
    </ul>
    <a><h4>Observaciones: </h4>{service.observations}</a>
    <br></br>
    <GenericButton onClick={()=>{navigate(-1)}} buttonText={'Volver'}/>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    </div>
  )
}

export default DetailService