
import Card from '../card/Card';
import style from './Cards.module.css'

const Cards = ({ info, elModal }) => {
  return (
    <div className={style.bigDiv}>
      {
        info.length > 0 ?
          (info && info.map((el) => {
            const { titlePost, imgPost, textPost } = el
            return (
              <Card titulo={titlePost} imagen={imgPost} descripcion={textPost} elModal={elModal} />
            )
          }))
          :
          <h2 className={style.h2Error}>¡Vaya! no hemos encontrado ese tip.</h2>
      }
    </div>
  )
}

export default Cards