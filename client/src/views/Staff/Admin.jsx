import style from './styles/Admin.module.css'
import { useEffect, useState } from 'react'
import GenericButton from '../../components/GenericButton/GenericButton'
import { UserGrid, CarGrid, CarryTable } from '../../components/StaffComponent/Index'
import { getAllCars, getAllUsers, getAllServices } from '../../redux/actions'
import { useDispatch, useSelector } from 'react-redux'


const Admin = () => {
  const dispatch = useDispatch();

  


  //Logica para el panel de servicios
 const [service, setService] = useState(false)
  const services = useSelector((state) => state.services)

 const handleToggleServ = ()=>{
  setService(true)
 }
 const handleHiddeServ = ()=>{
  setService(false)
 }
//------------------------------------------

  useEffect(() => {
    if(service===true){
      dispatch(getAllServices())
    }
    dispatch(getAllUsers())
    dispatch(getAllCars())

  }, [service]);

  return (
    <div className={style.bigDiv}>

      <br></br>
      {/* <h2>Panel de Administrador:</h2> */}
        <div className={style.cardList}>
      {(!service)?<>
      <GenericButton onClick={handleToggleServ} buttonText={'Ver Services'}/>
        <UserGrid />
        <CarGrid /></>:
       <><GenericButton onClick={handleHiddeServ} buttonText={'Ver Usuario/Vehic.'}/>
        <CarryTable data={services}/></>}
       <GenericButton  buttonText={'Programar servicio'}/>
       </div>
      
    </div>
  )
}

export default Admin
