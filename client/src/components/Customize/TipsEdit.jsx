import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllTipsFull, updateTips } from "../../redux/actions";
import Swal from "sweetalert2";

function TipsEdit() {
  const dispatch = useDispatch();
  const allTips = useSelector((state) => state.allTips);
  const [catUniques, setCatUniques] = useState([]); //nombre de las categorías, sólo las que están presentes en allTips
  const [searchTerm, setSearchTerm] = useState(""); //estado para los términos de búsqueda, filtrado reactivo
  const [filteredTips, setFilteredTips] = useState([]); // Estado para los tips filtrados qu se mapean
  const [filterPublished, setFilterPublished] = useState(true);
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [categorySelected, setCategorySelected] = useState([]);
  const [order, setOrder] = useState({
    date: { text: "", order: "DESC" },
    title: { text: "", order: "DESC" },
  });

  useEffect(() => {
    dispatch(getAllTipsFull());
  }, []);

  useEffect(() => {
    const uniqueCategories = () => {
      const uniq =
        allTips &&
        allTips
          .map((tip) => tip.CategoryPost?.descCategory)
          .filter(
            (category, index, self) =>
              category && self.indexOf(category) === index
          );

      return uniq.sort();
    };
    setCatUniques(uniqueCategories);
  }, [allTips]);

  useEffect(() => {
    if (allTips && allTips.length > 0) {
      // Aplicar los filtros sobre los tips originales
      const filterTips = (() => {
        let filtered = allTips.filter((tip) =>
          tip.titlePost.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterPublished !== null) {
          filtered = filtered.filter(
            (tip) => tip.published === filterPublished
          );
        }
        if (filterFavorite !== null) {
          filtered = filtered.filter(
            (tip) => tip.viewFavPost === filterFavorite
          );
        }
        if (categorySelected.length > 0) {
          filtered = filtered.filter(function (element) {
            return categorySelected.includes(element.CategoryPost.descCategory);
          });
        }

        return filtered;
      })();
      setFilteredTips(filterTips);

      setOrder({
        date: { text: "", order: "DESC" },
        title: { text: "", order: "DESC" },
      });
    }
  }, [allTips, searchTerm, filterPublished, filterFavorite, categorySelected]);

  //manejador de los eventos de clic de botones de Orden
  const handleOrder = (event) => {
    //puede llegar como orderDate u orderTitle
    if (event.target.name === "orderDate") {
      if (order.date.order === "ASC") {
        setOrder({
          title: { text: "", order: "ASC" },
          date: { text: "\u25BC", order: "DESC" },
        });
        const sortedDesc = [...filteredTips].sort(
          (a, b) => new Date(b.datePost) - new Date(a.datePost)
        );
        setFilteredTips(sortedDesc);
      } else if (order.date.order === "DESC") {
        setOrder({
          title: { text: "", order: "ASC" },
          date: { text: "\u25B2", order: "ASC" },
        });
        const sortedAsc = [...filteredTips].sort(
          (a, b) => new Date(a.datePost) - new Date(b.datePost)
        );
        setFilteredTips(sortedAsc);
      }
    } else {
      //orderTitle
      if (order.title.order === "ASC") {
        setOrder({
          title: { text: "\u25BC", order: "DESC" },
          date: { text: "", order: "ASC" },
        });
        const sortedDesc = [...filteredTips].sort((a, b) =>
          b.titlePost.localeCompare(a.titlePost)
        );
        setFilteredTips(sortedDesc);
      } else if (order.title.order === "DESC") {
        setOrder({
          title: { text: "\u25B2", order: "ASC" },
          date: { text: "", order: "ASC" },
        });
        const sortedAsc = [...filteredTips].sort((a, b) =>
          a.titlePost.localeCompare(b.titlePost)
        );
        setFilteredTips(sortedAsc);
      }
    }
  };

  //manejador de evento clic de Publicado en la CARD
  const handlePublish = async (id, event) => {
    //si vamos a quitar de Publicado, verificar que queden al menos 3
    if (event.target.checked) {
      //aquí sólo quiero publicarlo
      await dispatch(updateTips(id, { published: true }));
      await dispatch(getAllTipsFull());
    } else {
      //si lo voy a quitar de Publicados, verificar que queden al menos 3 Pub y Fav
      const totalFavs = allTips.filter(
        (tip) => tip.viewFavPost === true
      ).length;
      const totalPublished = allTips.filter(
        (tip) => tip.published === true
      ).length;

      if (totalFavs <= 3 || totalPublished <= 3) {
        Swal.fire("Debemos mantener al menos 3 Tips publicados y 3 Favoritos");
      } else {
        await dispatch(
          updateTips(id, { published: false, viewFavPost: false })
        );
        await dispatch(getAllTipsFull());
      }
    }
  };

  //manejador de evento clic de Publicado en la CARD
  const handleFavorite = async (id, event, published) => {
    let confirm = false;
    let salir = false;

    //si se va a marcar como favorito debe estar publicado
    if (event.target.checked && !published) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success m-1",
          cancelButton: "btn btn-danger m-1",
        },
        buttonsStyling: false,
      });
      await swalWithBootstrapButtons
        .fire({
          title: "Tips no publicado",
          text: "Se publicará el Tips para marcarlo como Favorito",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "De acuerdo",
          cancelButtonText: "No, espera...",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            confirm = true;
            // swalWithBootstrapButtons.fire({
            //   title: "Deleted!",
            //   text: "Your file has been deleted.",
            //   icon: "success",
            // });
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            // swalWithBootstrapButtons.fire({
            //   title: "Cancelled",
            //   text: "Your imaginary file is safe :)",
            //   icon: "error",
            // });
            salir = true;
          }
        });
    }
    if (salir) return; //cancelamos la ejecución en el swal anterior

    if (confirm) {
      //confirmamos el swal anterior
      await dispatch(
        updateTips(id, {
          viewFavPost: true,
          published: true,
        })
      );
      await dispatch(getAllTipsFull());
      return;
    }

    //si vamos a quitar de Favoritos, verificar que queden al menos 3 marcados como Favoritos
    if (event.target.checked) {
      //si lo voy a marcar como Fav, hacerlo y terminar
      await dispatch(updateTips(id, { viewFavPost: true }));
      await dispatch(getAllTipsFull());
      return;
    }

    const totalFavs = allTips.filter((tip) => tip.viewFavPost === true).length;
    const totalPublished = allTips.filter(
      (tip) => tip.published === true
    ).length;

    if (totalFavs <= 3 || totalPublished <= 3) {
      Swal.fire("Debemos mantener al menos 3 Tips publicados y 3 Favoritos");
    } else {
      await dispatch(updateTips(id, { viewFavPost: false }));
      await dispatch(getAllTipsFull());
    }
  };

  return (
    <div className="container align-items-center justify-content-center">
      <h4> Personaliza tu blog</h4>
      <div className="container w-75">
        <p>
          En esta sección podrás crear y modificar los Tips para tu blog o lista
          de consejos.
        </p>
      </div>
      <div className="d-flex flex-wrap">
        {/*barra de la IZQUIERDA */}
        <div
          className="container align-items-center col-md-3 pt-3 pb-3"
          style={{ minHeight: "200px" }}
        >
          {/* input search */}
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i class="bi bi-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          {/*Switch Publicados*/}
          <div
            class="d-flex flex-row align-items-center  form-check form-switch border rounded my-3 bg-light bg-gradient p-0"
            style={{ height: "54px" }}
          >
            <input
              class="form-check-input"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked={filterPublished}
              onChange={(event) => setFilterPublished(event.target.checked)}
            ></input>
            <label class="form-check-label" htmlFor="flexSwitchCheckChecked">
              Publicados
            </label>
          </div>
          {/*Switch Favoritos*/}
          <div
            class="d-flex flex-row align-items-center  form-check form-switch border rounded my-3 bg-light bg-gradient p-0"
            style={{ height: "54px" }}
          >
            <input
              class="form-check-input"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckFav"
              checked={filterFavorite}
              onChange={(event) => setFilterFavorite(event.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="flexSwitchCheckFav">
              Favoritos
            </label>
          </div>
          {/*Ordenamiento */}
          <div
            className="d-flex flex-column   form-check form-switch border rounded my-3 bg-light bg-gradient p-2"
            style={{ minHeight: "54px" }}
          >
            <p>Ordenamiento</p>
            <div className="d-flex flex-wrap justify-content-evenly">
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="orderDate"
                  onClick={handleOrder}
                >
                  Fecha {order.date.text}
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="orderTitle"
                  onClick={handleOrder}
                >
                  Título{order.title.text}
                </button>
              </div>
            </div>
          </div>
          {/*Filter Categoies*/}
          <div className="d-flex flex-column text-secondary fw-normal align-items-start">
            <div className=" d-flex">
              <p>
                <b>Categorías</b>
              </p>
            </div>
            {/*Categorias map*/}
            {catUniques?.map((cat, index) => (
              <div key={index} className="d-flex ">
                <div className="form-check ">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id={cat}
                    checked={categorySelected.some(
                      (element) => element === cat
                    )}
                    onChange={(event) =>
                      setCategorySelected((prevSelected) =>
                        event.target.checked
                          ? [...prevSelected, cat]
                          : prevSelected.filter((category) => category !== cat)
                      )
                    }
                  ></input>
                  <label className="form-check-label" htmlFor={cat}>
                    {cat}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* visualización de Card a la DERECHA*/}
        <div className="d-flex align-content-center justify-content-center flex-wrap col-md-9 gap-5 pt-3 pb-3">
          {allTips
            ? filteredTips.map((tip, index) => (
                <div
                  key={tip.idPost}
                  className="card text-secondary fw-normal shadow"
                  style={{ width: "250px" }}
                >
                  <div className="card-img-top">
                    <img
                      src={tip.imgPost[0]}
                      className="card-img-top"
                      alt={tip.titlePost}
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-title">
                      <b>{tip.titlePost}</b>
                    </p>
                    <p className="card-text">
                      {tip.textPost.length > 20
                        ? `${tip.textPost.substring(0, 80)}...`
                        : tip.textPost}
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Categoría:
                      {tip.CategoryPost ? tip.CategoryPost.descCategory : null}
                    </li>
                    <li className="list-group-item">
                      Fecha guardado/publicado <br />
                      {tip.datePost}
                    </li>
                  </ul>

                  <div className="container d-flex ps-5">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={`checkPublish${tip.idPost}`}
                        id={`checkPublish${tip.idPost}`}
                        checked={tip.published}
                        onChange={(event) => handlePublish(tip.idPost, event)}
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor={`checkPublish${tip.idPost}`}
                      >
                        Publicado
                      </label>
                    </div>
                  </div>
                  <div className="container d-flex ps-5">
                    <div className="form-check ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={`flexCheckChecked${tip.idPost}`}
                        id={`flexCheckChecked${tip.idPost}`}
                        checked={tip.viewFavPost}
                        onChange={(event) =>
                          handleFavorite(tip.idPost, event, tip.published)
                        }
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckChecked${tip.idPost}`}
                      >
                        Favorito
                      </label>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="container my-3" style={{ display: "none" }}>
          {/*aquí abajo va el paginado */}
          <nav aria-label="Page navigation example">
            <ul class="pagination justify-content-center">
              <li class="page-item disabled">
                <a class="page-link">Previous</a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  1
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  2
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  3
                </a>
              </li>
              <li class="page-item">
                <a class="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default TipsEdit;
