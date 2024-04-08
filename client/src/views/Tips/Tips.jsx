import React from 'react'
import style from './Tips.module.css'
import datosPrueba from './DatosPrueba'
import Cards from '../../components/cards/Cards';

function Tips() {
    const datosDePrueba = datosPrueba()
    console.log(datosDePrueba);
    return (
        <div className={style.mainDiv}>
            <div className={style.divHeaderImg}>
                <img className={style.headerImg} src="https://www.healeybrothers.com/content/images/comingsoon/2021FordMustangMach1/Header.jpg" alt="" />
            </div>


            <div className={style.divMenuFilter}>
                <h3>Filtros y busquedas</h3>
                <hr></hr>
                <h4>opciones</h4>
                <h4>opciones</h4>
                <h4>opciones</h4>
                <h4>opciones</h4>
                <h4>opciones</h4>
            </div>

            <div className={style.divCard}>
                <Cards info={datosDePrueba} />
            </div>

        </div>
    )
}

export default Tips