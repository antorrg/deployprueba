import React from 'react'
import style from './Card.module.css'

const Card = ({ titulo, imagen, descripcion, elModal }) => {
  const cardInfo = { title: titulo, image: imagen, description: descripcion, }
  return (
    <div className={style.bigDiv} onClick={() => elModal(cardInfo)}>

      <div className={style.divImg}>
        <img className={style.img} src={imagen} alt="" />
      </div>

      <div className={style.divTitle}>
        <h3 className={style.title}>{titulo}</h3>
      </div>

      <div className={style.divText}>
        <p className={style.text}>{descripcion}</p>
      </div>
    </div>
  )
}

export default Card