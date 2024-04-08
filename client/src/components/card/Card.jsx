import React from 'react'
import style from './Card.module.css'

const Card = ({ titulo, imagen, descripcion }) => {

  return (
    <div className={style.bigDiv}>

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