import {useEffect, useState}from 'react'
import {useAuth} from '../../components/Auth/AuthContext/AuthContext'
import {useParams, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import GenericButton from '../../components/GenericButton/GenericButton'
import {carById} from '../../redux/actions'
import { EditWindow } from '../Index';

const Detail = () => {
  const {authenticated, user}=useAuth()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {id}= useParams();
  const userEdit = useSelector((state)=>state.detailUsers)
  const cars = useSelector((state)=>state.carById)
  const [edition, setEdition]=useState(false)

  const goBack=()=>{
    navigate(-1)
  }


  const onClose=()=>{
   setEdition(false)
  }
  const handlEdit = ()=>{
    setEdition(true)
  }
 useEffect(()=>{
  dispatch(carById(id))
 },[dispatch, id])

  return (
    <div>
      <div>
      <div>
        <ul>
        <ul>
        <p>Mis Vehículos:</p>
        {cars && cars.map((car) => (
          <li key={car.id}>
            <p>Patente: {car.patent}</p>
            <p>Marca: {car.mark}</p>
          </li>
        ))}
      </ul>
        </ul>
      <h3>{userEdit?.name}</h3>
      </div>
       {edition ? <EditWindow  onClose={onClose} userEdit={userEdit}/> : null}
      <GenericButton onClick={handlEdit} buttonText={'Editar Perfil:'}/>
      <GenericButton onClick={goBack} buttonText={'Volver'}/>
      </div>
    </div>
  )
}
export default Detail;