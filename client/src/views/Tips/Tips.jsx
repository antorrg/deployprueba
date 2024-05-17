import React, { useEffect } from 'react'
import style from './Tips.module.css'
import datosPrueba from './DatosPrueba'
import Cards from '../../components/cards/Cards';
import { useDispatch, useSelector } from 'react-redux'
import { getAllCategoryTips, getAllTips, getOrderTips, optionFiltered, searchTips, stateOrderTips } from '../../redux/actions';
import { useState } from 'react';

function Tips() {
    const dispatch = useDispatch()
    const allTips = useSelector((state) => state.allTips)
    const allCategoryTips = useSelector((state) => state.allCategoryTips)
    const variableFilter = useSelector((state) => state.variableFilter)
    const optionFilter = useSelector((state) => state.optionFilter)
    const [activeSearch, setActiveSearch] = useState(false)
    const tipsSearch = useSelector((state) => state.tipsSearch)
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


    // Estado para controlar si el modal está abierto o cerrado
    const [modalOpen, setModalOpen] = useState(false);
    // Estado para almacenar la información de la tarjeta seleccionada
    const [selectedCardInfo, setSelectedCardInfo] = useState(null);

    // Función para abrir el modal y mostrar la información de la tarjeta seleccionada
    const handleCardClick = (cardInfo) => {
        console.log(cardInfo);
        setSelectedCardInfo(cardInfo);
        setModalOpen(true);
    };

    // Función para cerrar el modal
    const closeModal = () => {
        setSelectedCardInfo(null);
        setModalOpen(false);
    };


    const handleCloseOutside = (event) => {
        if (event.target.classList.contains("modal")) {
            closeModal();
        }
    };
    console.log(activeSearch);
    const handlerSearch = (event) => {
        if (event.target.value.length === 0) {
            setActiveSearch(false)
        }
        if (event.target.value.length > 0) {
            setActiveSearch(true)
            dispatch(searchTips(event.target.value))
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
                <div class={`input-group flex-nowrap ${style.divSearch}`}>
                    <span class="input-group-text" id="addon-wrapping">Buscar</span>
                    <input type="text" class="form-control" placeholder="tips" aria-label="Username" aria-describedby="addon-wrapping" onChange={(el) => handlerSearch(el)}></input>
                </div>
                <div className={style.categoryDiv}>

                    <span className={style.spanTitle}>Categorias</span>
                    <select value={optionFilter.category} onChange={(el) => handlerSelect(el)} class="form-select" aria-label="Default select example" >
                        <option key={0} >Todos</option>
                        {
                            allCategoryTips && allCategoryTips.map((el) => {
                                return (<option className={style.optionText} key={el.idCategory} value={el.descCategory}> {el.descCategory}</option>)
                            })
                        }

                    </select>
                </div>

                <div className={style.orderDiv}>
                    <span className={style.spanTitle}>Ordenar por:</span>
                    <select value={optionFilter.order} onChange={(el) => handlerSelect(el)} className={`form-select ${style.selectOrder}`} aria-label="Default select example">
                        <option value={"nameAsc"} >A-Z</option>
                        <option value={"nameDesc"} >Z-A</option>
                        <option value={"timeDesc"} >Más Recientes</option>
                        <option value={"timeAsc"} >Más Antiguos </option>


                    </select>


                </div>
            </div>

            <div className={style.divCard}>
                <Cards info={activeSearch ? tipsSearch : allTips} elModal={handleCardClick} />
            </div>


            {modalOpen && (
                <div className={`modal ${style.bigDivModal}`} tabindex="-1" onClick={(event) => handleCloseOutside(event)} style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.5)', position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                    <div className={`modal-dialog ${style.secondDivModal}`}>
                        <div className={`modal-content ${style.divContentModal}`}>
                            {/* Contenido del modal */}
                            <div className={style.divButton}>
                                {/* Botón para cerrar el modal */}
                                <button type="button" class={`btn btn-close ${style.buttonModal}`} aria-label="Close" onClick={closeModal}></button>
                                {/* <button type="button" className={`btn btn-primary ${style.buttonModal}`} onClick={closeModal}>Cerrar</button> */}
                            </div>
                            {selectedCardInfo && (
                                <div className={`modal-body ${style.divBodyModal}`}>
                                    {/* Mostrar la información de la tarjeta seleccionada */}
                                    <h2 className={style.h2Modal}>{selectedCardInfo.title}</h2>
                                    <img className={style.imgModal} src={selectedCardInfo.image} alt="" />
                                    <p className={style.pModal}>{selectedCardInfo.description}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}





        </div>
    )
}

export default Tips