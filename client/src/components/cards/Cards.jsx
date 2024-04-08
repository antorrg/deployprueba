
import Card from '../card/Card';
import style from './Cards.module.css'

const Cards = ({ info }) => {
  return (
    <div className={style.bigDiv}>
      {
        info && info.map((el) => {
          const { titulo, imagen, descripcion } = el
          return (
            <Card titulo={titulo} imagen={imagen} descripcion={descripcion} />
          )
        })
      }
    </div>
  )
}

export default Cards