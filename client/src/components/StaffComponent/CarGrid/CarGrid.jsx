import Car from './Car'
import style from './styles/CarGrid.module.css'
import {carByPat, getAllCars} from '../../../redux/actions'
import {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams, useLocation} from 'react-router-dom'
import GenericSearch from '../searchComp/GenericSearch'


const CarGrid = ({}) => {
  const location = useLocation();
  const dispatch = useDispatch();
  //const {name}=useParams();
   //Separamos la query del params y hacemos dos variables:
   const queryParams = new URLSearchParams(location.search);
   const type = queryParams.get('type'); //Obtener el type "user" o "car"
   const id = location.pathname.split('/').pop(); // Obtener el ID de la URL
  
 const found = useSelector((state)=>state.byPat)
 const allCars = useSelector((state)=>state.allCars)

 const name = type === 'car' ? id : null;

 useEffect(()=>{
  if(name){
    dispatch(carByPat(id))
  }else{
    dispatch(getAllCars())
  }
 },[dispatch, name])


  return (
    <div className={style.cardList}>
      <GenericSearch dir={'admin'} dest= {'admin'} query={'car'} searchFun={carByPat} place={'Patente Nº...'}/>
    {name? (
      <Car key={found.id} data={found}/>
    ) :(allCars&& allCars.map((frag)=>
    <Car key={frag.id} data={frag}/>
    ))}
    </div>
  )
}

export default CarGrid

