import User from './User'
import style from '../generalStyles/CarUserGrids/Grid.module.css'
import {userBynumId, getAllUsers} from '../../../redux/actions'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useLocation} from 'react-router-dom'
import GenericSearch from '../searchComp/GenericSearch'


const UserGrid = ({data}) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const type = queryParams.get('type'); //Obtener el type "user" o "car"
  const id = location.pathname.split('/').pop(); // Obtener el ID de la URL
  
 const user = useSelector((state)=>state.userByDni)
 const allUsers = useSelector((state)=>state.allUsers)
 
 const name = type === 'user' ? id : null;

 useEffect(()=>{
  if(name){
    dispatch(userBynumId(name))
  }else{
    dispatch(getAllUsers())
  }
 },[dispatch, name])

  return (
    <div className={style.cardList}>
      <GenericSearch dir={'admin'} dest= {'admin'} query={'user'} searchFun={userBynumId} place={'Doc. Nº...'}/>
    {name? (
      <User key={user?.id} data={user&&user}/>
    ) :(allUsers&& allUsers.map((frag)=>
    <User key={frag.id} data={frag}/>
    ))}
    </div>
  )
}

export default UserGrid