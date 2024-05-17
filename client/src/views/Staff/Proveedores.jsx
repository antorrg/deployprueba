import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviders } from "../../redux/actions";
import DivInput from "../../components/GenericButton/DivInput";

const DivProvider = ({ provider, handleModalDetailShow }) => {
  const [styleHover, setStyleHover] = useState(false); // estado para el hover

  const styleRow = {
    backgroundColor: "rgb(217, 206, 179)",
    cursor: "pointer",
    transform: "translateZ(0)",
    transition: "transform 0.5s ease-out",
    zIndex: 1,
  };

  // Estilos para el efecto hover
  const hoverStyle = {
    transform: "scale(1.03)",
    zIndex: 2,
  };
  const DivMin = ({ icon, text }) => {
    // Función para truncar el texto a un máximo de 20 caracteres más
    const truncateText = (text, maxLength) => {
      if (!text) {
        return "";
      }

      if (text.length > maxLength) {
        return text.substring(0, maxLength) + "...";
      } else {
        return text;
      }
    };

    return (
      <div className="col-md-6 col-lg-3">
        <div className=" row  my-2 ">
          <div className="col-2 text-center">{icon}</div>
          <div className="col-10 text-start">{truncateText(text, 20)}</div>
        </div>
      </div>
    );
  };
  return (
    <div
      className="row border rounded"
      style={styleHover ? { ...styleRow, ...hoverStyle } : styleRow}
      onMouseOver={() => setStyleHover(true)}
      onMouseOut={() => setStyleHover(false)}
      onClick={handleModalDetailShow}
    >
      <DivMin
        icon={<i className="bi bi-buildings"></i>}
        text={provider.razonsocial}
      />
      <DivMin
        icon={<i className="bi bi-bookmark-star"></i>}
        text={provider.fantasia}
      />
      <DivMin
        icon={<i className="bi bi-person-check-fill"></i>}
        text={provider.contacto}
      />
      <DivMin
        icon={<i className="bi bi-telephone"></i>}
        text={provider.telefono}
      />
    </div>
  );
};

const ModalDetail = ({ handleModalDetailHide, providerDetail }) => {
  //para habilitar o no el modo edición de los input
  const [divInputDisabled, setDivInputDisabled] = useState(true);
  //mostrar button Modo Edición  - Guardar cambios
  const [editMode, setEditMode] = useState("edit");
  const [close, setClose] = useState("Cerrar");

  //estado local con la data
  const [dataProvider, setDataProvider] = useState(providerDetail);
  console.log(dataProvider);
  const [error, setError] = useState({
    razonsocial: "",
    fantasia: "",
    contacto: "",
    direccion: "",
    ciudad: "",
    telefono: "",
    email: "",
    otro: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setDataProvider({
      ...dataProvider,
      [name]: value,
    });
    // setError({
    //   ...error,
    //   [name]: ValidLogin({ ...input, [name]: value })[name],
    // });
  }
  return (
    <div
      className="row"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 999,
      }}
      tabIndex="-1"
    >
      <div
        className="col-10 col-sm-8 col-md-10 col-lg-8 col-xl-6 col-xxl-5  align-items-center justify-content-center"
        style={{
          borderRadius: "5px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)",
          backgroundColor: "rgb(217, 206, 179",
        }}
      >
        <div className="my-3 mx-auto ">
          <div className="row ">
            {/*imagen del proveedor */}
            <div className="col-md-4">
              {providerDetail && providerDetail.img ? (
                <img
                  src={providerDetail.img}
                  className="img-fluid rounded mx-1"
                  alt="Proveedor del taller mecánico"
                />
              ) : (
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/images%2FPersonNotFound.svg?alt=media&token=90521119-5566-45e3-b7f5-3aeb3bc8da41"
                  className="img-fluid rounded border mx-1"
                  alt="Proveedor del taller mecánico"
                />
              )}
            </div>
            {/*data del proveedor */}
            <div className="col-md-8">
              <DivInput
                labelText={"Razón"}
                name={"razonsocial"}
                value={dataProvider ? dataProvider.razonsocial : ""}
                error={error.razonsocial}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Fantasía"}
                name={"fantasia"}
                value={dataProvider ? dataProvider.fantasia : ""}
                error={error.fantasia}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Contacto"}
                name={"contacto"}
                value={dataProvider ? dataProvider.contacto : ""}
                error={error.contacto}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Dirección"}
                name={"direccion"}
                value={dataProvider ? dataProvider.direccion : ""}
                error={error.direccion}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Ciudad"}
                name={"ciudad"}
                value={dataProvider ? dataProvider.ciudad : ""}
                error={error.ciudad}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Teléfono"}
                name={"telefono"}
                value={dataProvider ? dataProvider.telefono : ""}
                error={error.telefono}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Email"}
                name={"email"}
                value={dataProvider ? dataProvider.email : ""}
                error={error.email}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Otros"}
                name={"otro"}
                value={dataProvider ? dataProvider.otro : ""}
                error={error.otro}
                height="small"
                disabled={divInputDisabled}
                handleChange={handleChange}
              />
              <DivInput
                labelText={"Provincia"}
                name={"descProvince"}
                value={
                  providerDetail.Province
                    ? providerDetail.Province.descProvince
                    : ""
                }
                height="small"
                disabled={divInputDisabled}
              />
            </div>
          </div>

          {/*Botones inferiores del modal */}
          <div>
            {editMode === "edit" ? (
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  setEditMode("save");
                  setDivInputDisabled(false);
                  setClose("Descartar y cerrar");
                }}
              >
                Modo edición
              </button>
            ) : (
              <button type="button" className="btn btn-primary m-2">
                Guardar cambios
              </button>
            )}

            <button
              type="button"
              className="btn btn-secondary m-2"
              // data-bs-dismiss="modal"
              onClick={handleModalDetailHide}
            >
              {close}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Proveedores = () => {
  const allProviders = useSelector((state) => state.allProviders);
  const dispatch = useDispatch();
  const [orderRazon, setOrderRazon] = useState(true);
  const [orderFantasia, setOrderFantasia] = useState(true);
  const [orderContacto, setOrderContacto] = useState(true);
  const [providers, setProviders] = useState([]);
  const [modalDetailShow, SetModalDetailShow] = useState(false);
  //almacenamos el Proveedor a mostrar en el Modal
  const [providerDetail, setProviderDetail] = useState();

  //estado para los términos de búsqueda, filtrado reactivo
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getAllProviders());
    };

    loadData();
  }, []);

  useEffect(() => {
    setProviders(allProviders);
  }, [allProviders]);

  const handleClicOrder = (column) => {
    switch (column) {
      case "razonsocial":
        providers.sort((a, b) => {
          if (a.razonsocial < b.razonsocial) {
            return orderRazon ? -1 : 1; // Orden ascendente si orderRazon es true, descendente si es false
          }
          if (a.razonsocial > b.razonsocial) {
            return orderRazon ? 1 : -1; // Orden ascendente si orderRazon es true, descendente si es false
          }
          return 0;
        });
        setOrderRazon(!orderRazon);
        break;
      case "fantasia":
        providers.sort((a, b) => {
          if (a.fantasia < b.fantasia) {
            return orderFantasia ? -1 : 1;
          }
          if (a.fantasia > b.fantasia) {
            return orderFantasia ? 1 : -1;
          }
          return 0;
        });
        setOrderFantasia(!orderFantasia);
        break;
      case "contacto":
        providers.sort((a, b) => {
          if (a.contacto < b.contacto) {
            return orderContacto ? -1 : 1;
          }
          if (a.contacto > b.contacto) {
            return orderContacto ? 1 : -1;
          }
          return 0;
        });
        setOrderContacto(!orderContacto);
        break;
      default:
        // No hacer nada en el caso predeterminado
        break;
    }
  };

  const handleSearch = (searchTerm) => {
    const normalizedSearchText = searchTerm.toLowerCase();
    const filteredArray = allProviders.filter((item) => {
      return ["razonsocial", "fantasia", "contacto", "otro"].some((key) => {
        const normalizedValue = (item[key] && item[key].toLowerCase()) || ""; // Verificar si item[key] es null
        return normalizedValue.includes(normalizedSearchText);
      });
    });
    setProviders(filteredArray);
  };

  return (
    <>
      <div
        className="container border rounded shadow my-2"
        style={{ minHeight: "600px" }}
      >
        <p className="fs-4 my-2">Proveedores</p>
        Proveedores en construccion (esto se encuentra en views/Staff)
        <div className="container row my-2 mx-auto">
          {/*Div izquierdo para filtros */}
          <div className="col-sm-3 border">
            {/* input search */}
            <div className="input-group my-3">
              <input
                type="text"
                className="form-control"
                placeholder="Buscar..."
                value={searchTerm}
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              />
              <button
                className="btn btn-outline-secondary "
                type="button"
                id="clearButton"
              >
                &times;
              </button>
              <div className="input-group-prepend">
                <span
                  className="input-group-text"
                  onClick={() => handleSearch(searchTerm)}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-search"></i>
                </span>
              </div>
            </div>
            {/*Filter Categoies*/}
            <div className="d-flex flex-column text-secondary fw-normal align-items-start">
              <div className=" d-flex">
                <p>
                  <b>
                    Categorías
                    <i
                      className="bi bi-pencil fs-6"
                      style={{ cursor: "pointer" }}
                      // onClick={handleClicModalCategories}
                    ></i>
                  </b>
                </p>
              </div>
              {/*Categorias map*/}
              {/* {catUniques?.map((cat, index) => (
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
            ))} */}
            </div>
          </div>
          {/*Div derecho para datos */}
          <div className=" col-sm-9 border">
            <div className="row my-3">
              <div className="col col-sm-4 col-md-4 col-lg-3">
                {/*Head razonsocial*/}
                <i className="bi bi-buildings mx-1"></i>
                <i
                  className="bi bi-arrow-down-up mx-1 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClicOrder("razonsocial")}
                ></i>
              </div>
              <div className="col col-sm-4 col-md-4 col-lg-3">
                {/*Head fantasia*/}
                <i className="bi bi-bookmark-star mx-1"></i>
                <i
                  className="bi bi-arrow-down-up mx-1 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClicOrder("fantasia")}
                ></i>
              </div>
              <div className="col col-sm-4 col-md-4 col-lg-3">
                {/*Head contacto*/}
                <i className="bi bi-person-check-fill mx-1"></i>
                <i
                  className="bi bi-arrow-down-up mx-1 text-danger"
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClicOrder("contacto")}
                ></i>
              </div>
            </div>
            {providers.map((provider, index) => {
              return (
                <div className="container  my-3 " key={index}>
                  <DivProvider
                    provider={provider}
                    handleModalDetailShow={() => {
                      setProviderDetail(provider);
                      SetModalDetailShow(true);
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        {/*modalDetailShow */}
        {modalDetailShow && (
          <ModalDetail
            handleModalDetailHide={() => SetModalDetailShow(false)}
            providerDetail={providerDetail}
          />
        )}
      </div>
    </>
  );
};

export default Proveedores;
