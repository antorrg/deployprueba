import {Link, useNavigate} from 'react-router-dom'
import {useAuth} from '../../Auth/AuthContext/AuthContext'
import style from './InnerDetail.module.css'
import {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getMyServices} from '../../../redux/actions'
import GenericButton from '../../GenericButton/GenericButton'
import Edition from '../AdminHelpers/Edition/Edition';
import EditWindow from '../../Auth/EditComponents/ModalEdit';
import CreateModal from '../Cars&ServiceEdit/EditCars/Create/CreateModal'
import CarryTable from '../ServiceComp/CarryTable'
import CreateServModal from '../Cars&ServiceEdit/EditServices/Create/CreateServModal'
import {infoSelect, roles, estado, allowing} from '../AdminHelpers/Helpers/InfoMap';
import ModalEditCar from '../Cars&ServiceEdit/EditCars/ModalEditCar'

const InnerDetail = ({ type, data }) => {
  const {user}=useAuth()
    const navigate= useNavigate()
    const [userEdition, setUserEdition] = useState(false);
    const [createCar, setCreateCar]= useState(false)
    const [editCar, setEditCar] = useState(false)
    const infoEditing = useSelector((state)=>state.LogIn)
    
    
    const onClose=()=>{
      setUserEdition(false)
      setEditCar(false)
      //navigate(-1)
    }
    //Edicion de usuario
  const handlerUser = ()=>{
    setUserEdition(true);
  }
  //creacion y edicion de vehiculos
  const handlerCreate = ()=>{
    const userId = (type==='user')? data.id: null;
    sessionStorage.setItem('idUser', userId)
    setCreateCar(true)
  }
  const closerAd = ()=>{
    sessionStorage.clear()
    setCreateCar(false)
  }
   const handEditCar = () => {
    setEditCar(true) 
   }
  //Presentacion y edicion de servicios
  const dispatch = useDispatch()
  //Servicios: 
  const services = useSelector((state)=>state.servByCar)
  const [serv, setServ] = useState(false)
  const [creatServ, setCreatServ] = useState(false)
  
  const carId = (type==='car')? data.id: null;

  const handleServ = ()=>{
    sessionStorage.setItem('CarId', carId)
    setServ(true)
  }
  const servClose = ()=>{
    sessionStorage.clear()
    setServ(false)
  }
  const createServ= ()=>{
    setCreatServ(true)
  }
  const closServ = ()=>{
    setCreatServ(false)
  }
  useEffect(()=>{
    if(serv===true){
      dispatch(getMyServices(carId))
    }
  },[serv])
  //================================================
  const pars = (type === 'car')? data.Users : data.Cars
  const propietarios = infoSelect(pars)
  const info1 = (type==='user')? data.role: null;
  const rol = roles(info1)
  const info2 =  data.enable? data.enable: null;
  const enable = estado(info2)
  //Logica para gestionar permiso de edicion a usuario de su propia cuenta:
  
   const edt = allowing(infoEditing, data)
   //console.log('puedo editarme? ',edt)
  //===================================================
    return (
      <div className={style.container}>
        <h2>{type === 'car' ? 'Vehiculo:' : 'Usuario:'}</h2>
        <Edition onClick={()=>{navigate("/admin")}} text={'Panel Admin'} allowedRoles={[0, 2]}/>
          {type === 'car' && (
            <>
            <ul>
              <li>Patente: {data.patent}</li>
              <li>Marca: {data.mark}</li>
              <li>Modelo: {data.model}</li>
              <li>Año: {data.year}</li>
              <li>Numero de motor: {data.motorNum}</li>
              <li>Numero de chasis: {data.chassisNum}</li>
              <li>Estado: {enable}</li>
              <li>Creado: {data.createdAt}</li>
              <li>Actualizado: {data.updatedAt}</li>
              </ul>
              {user.role && user.role === 1? null : <>
                <div>
               <p>Propietario:</p>
                 {propietarios?.map((propietario, index) => (
                    <span key={index}>
                  <Link to={`/admin/dett/${propietario.id}?type=user`}>Nombre: {propietario.name}</Link>
                    {index !== propietarios.length - 1 ? ', ' : ''}
                       </span>
                       ))}
              </div>
              </>}
              
              <img src={data.picture} style={{ maxWidth: '150px' }}/>
              <label>Observaciones: {data.observations}</label>
              <div>
              <Edition allowedRoles={[0,2]} onClick={handEditCar } text={'Edit. Veh.'}/>
              {serv? <><GenericButton onClick={servClose} buttonText={'Cerrar Serv'}/>
              <Edition allowedRoles={[0,2]}  onClick={createServ} text={'Crear Serv'}/>
              <CarryTable data= {services}/></> : 
              <GenericButton onClick={handleServ} buttonText={'Ver Servicios'}/>}
              </div>
            </>
          )}
          {type === 'user' && (
            <>
             <ul>
              <li>Email: {data.email}</li>
              <li>Nombre: {data.name}</li>
              <li>Apodo: {data.nickname}</li>
              <li>Tipo documento: {data.typeId}</li>
              <li>Numero documento: {data.numberId}</li>
              <li>Rol: {rol}</li>
              <li>País: {data.country}</li>
              <li>Estado: {enable}</li>
              <li>Creado: {data.createdAt}</li>
              <li>Actualizado: {data.updatedAt}</li>
              </ul>
              {user.role===0||user.role===2 ?
                <div>
               <p>Vehiculo:</p>
                 {propietarios?.map((propietario, index) => (
                    <span key={index}>
                  <Link to={`/admin/dett/${propietario.id}?type=car`}>Patente: {propietario.name}</Link>
                    {index !== propietarios.length - 1 ? ', ' : ''}
                       </span>
                       ))}
              </div>
              : null}
              <img src={data.picture} style={{maxWidth:'150px'}}/>
              <div>
              <Edition allowedRoles={[0]}  exception={edt} onClick={handlerUser} text={'Edit Usuario'} />
              </div>
              <div>
              <Edition allowedRoles={[0,2]}  onClick={handlerCreate} text={'Crear Vehiculo'} />
              </div>
            </>
          )}
          <GenericButton onClick={()=>{navigate(-1)}} buttonText={'Volver'}/>
         {userEdition?
         <EditWindow userEdit={data} onClose={onClose} />:
         null}
         {createCar?
         <CreateModal closer={closerAd}/>: null}
         {creatServ?
         <CreateServModal closServ= {closServ}/>: null}
         {editCar?
         <ModalEditCar carEdit={data} onClose= {onClose}/> : null}
        
      </div>
    );
  };
  
  export default InnerDetail;
