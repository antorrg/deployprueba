import React, { useEffect } from 'react'
import style from './Tips.module.css'
import datosPrueba from './DatosPrueba'
import Cards from '../../components/cards/Cards';
import { useDispatch, useSelector } from 'react-redux'
import { getAllTips } from '../../redux/actions';

function Tips() {
    const dispatch = useDispatch()
    const allTips = useSelector((state) => state.allTips)
    useEffect(() => {
        if (allTips.length === 0) {
            dispatch(getAllTips())
        }
    }, [])
    console.log(allTips);
    const datosDePrueba = datosPrueba()
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
                <Cards info={allTips} />
            </div>

        </div>
    )
}

export default Tips