import {Link, useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'



import style from '../styles/Home.module.css'



const Home = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const myData = useSelector((state)=>state.LogIn)
 const name = myData.name? myData.name : myData.nickname;
 const cars = myData.Cars? myData.Cars : null;

  function closer() {
    setTimeout(() => { navigate(-1) }, 3000)
  }

  return (
    <div className={style.bigDiv}>
      <br></br>
      <br></br>
      <h1>Bienvenido ¡¡ {name}!!</h1>
      <ul>
        <p>Mis Vehículos:</p>
        {cars && cars.map((car) => (
          <li key={car.id}>
            <Link to={`/home/user/${car.id}?type=car`}>Patente: {car.patent}</Link>
          </li>
        ))}
      </ul>
     
    </div>
  )
}

export default Home