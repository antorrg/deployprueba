
import Card from '../card/Card';
import style from './Cards.module.css'

const Cards = ({ info }) => {
  return (
    <div className={style.bigDiv}>
      {
        info && info.map((el) => {
          const { titlePost, imgPost, textPost } = el
          return (
            <Card titulo={titlePost} imagen={imgPost} descripcion={textPost} />
          )
        })
      }
    </div>
  )
}

export default Cards