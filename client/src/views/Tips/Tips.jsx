import React, { useEffect } from 'react'
import style from './Tips.module.css'
import datosPrueba from './DatosPrueba'
import Cards from '../../components/cards/Cards';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryTips, getAllTips, getOrderTips, optionFiltered, stateOrderTips } from '../../redux/actions';
import { useState } from 'react';

function Tips() {
    const dispatch = useDispatch()
    const allTips = useSelector((state) => state.allTips)
    const allCategoryTips = useSelector((state) => state.allCategoryTips)
    const variableFilter = useSelector((state) => state.variableFilter)
    const optionFilter = useSelector((state) => state.optionFilter)
    console.log(variableFilter.cat);
    useEffect(() => {
        if (allTips.length === 0) {
            dispatch(getAllTips())
        }
        if (allCategoryTips.length === 0) {
            dispatch(getAllCategoryTips())
        }

    }, [])



    const handlerSelect = (el) => {
        console.log(el.target.value);
        const { cat } = variableFilter
        if (el.target.value == "nameAsc") {
            dispatch(getOrderTips(cat, "titlePost", "Asc"))
            dispatch(stateOrderTips(cat, "titlePost", "Asc"))
            return dispatch(optionFiltered(cat, "nameAsc"))
        } else if (el.target.value == "nameDesc") {
            dispatch(getOrderTips(cat, "titlePost", "Desc"))
            dispatch(stateOrderTips(cat, "titlePost", "Desc"))
            return dispatch(optionFiltered(cat, "nameDesc"))
        } else if (el.target.value == "timeDesc") {
            dispatch(getOrderTips(cat, "createdAt", "Desc"))
            dispatch(stateOrderTips(cat, "createdAt", "Desc"))
            return dispatch(optionFiltered(cat, "timeAsc"))
        } else if (el.target.value == "timeAsc") {
            dispatch(getOrderTips(cat, "createdAt", "Asc"))
            dispatch(stateOrderTips(cat, "createdAt", "Asc"))
            return dispatch(optionFiltered(cat, "timeAsc"))
        }

        else {
            dispatch(getOrderTips(el.target.selectedIndex, variableFilter.columnorder, variableFilter.order))
            dispatch(stateOrderTips(el.target.selectedIndex, variableFilter.columnorder, variableFilter.order))
            return dispatch(optionFiltered(el.target.value, optionFilter.order))
        }

    }


    return (
        <div className={style.mainDiv}>
            <div className={style.divHeaderImg}>
                <img className={style.headerImg} src="https://www.healeybrothers.com/content/images/comingsoon/2021FordMustangMach1/Header.jpg" alt="" />
            </div>


            <div className={style.divMenuFilter}>
                <h3 className={style.h3Title}>Filtros y busquedas</h3>
                <hr></hr>
                <span className={style.spanTitle}>Categorias</span>
                <select value={optionFilter.category} onChange={(el) => handlerSelect(el)} class="form-select" aria-label="Default select example" >
                    <option key={0} >Todos</option>
                    {
                        allCategoryTips && allCategoryTips.map((el) => {
                            return (<option className={style.optionText} key={el.idCategory} value={el.descCategory}> {el.descCategory}</option>)
                        })
                    }

                </select>
                <br></br>
                <br></br>
                <span className={style.spanTitle}>Ordenar por:</span>
                <select value={optionFilter.order} onChange={(el) => handlerSelect(el)} class="form-select" aria-label="Default select example">
                    <option value={"nameAsc"} selected>A-Z</option>
                    <option value={"nameDesc"} selected>Z-A</option>
                    <option value={"timeDesc"} selected>Más Recientes</option>
                    <option value={"timeAsc"} selected>Más Antiguos </option>


                </select>

            </div>

            <div className={style.divCard}>
                <Cards info={allTips} />
            </div>

        </div>
    )
}

export default Tips