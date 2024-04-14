import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProvinces, isMyCommerce } from "../../redux/actions";
import { updateCommerce } from "../../redux/actions";

function CommerceEdit() {
  const dispatch = useDispatch();
  const myCommerce = useSelector((state) => state.myCommerce);
  const allProvinces = useSelector((state) => state.allProvinces);
  const [commerceData, setCommerceData] = useState({});

  const handleChange = (event) => {
    const propiedad = event.target.name;
    const value = event.target.value;

    if (propiedad === "province") {
      setCommerceData({
        ...commerceData,
        Province: { ...commerceData.Province, descProvince: value },
      });
    } else {
      setCommerceData({ ...commerceData, [propiedad]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //buscar el id de la provincia seleccionada
    let provinceSelected;
    for (let i = 0; i < allProvinces.length; i++) {
      if (allProvinces[i].descProvince === commerceData.Province.descProvince)
        provinceSelected = allProvinces[i].idProvince;
    }
    commerceData.ProvinceIdProvince = provinceSelected;
    dispatch(updateCommerce(commerceData.id, commerceData));
    dispatch(isMyCommerce());
  };

  useEffect(() => {
    dispatch(isMyCommerce());
    dispatch(getProvinces());
    setCommerceData(myCommerce);
  }, []);

  return (
    <div className="container align-items-center justify-content-center">
      <h4> Datos de tu comercio</h4>
      <div className=" container w-75">
        <p>
          Aquí podrás actualizar los datos de tu Comercio. <br />
          Se mostrarán a pie de página. No reveles datos sensibles por
          cuestiones de seguridad. <br />{" "}
          <b>Guarda los cambios antes de salir.</b>
        </p>
      </div>
      <div class="container w-75">
        <form
          class="row g-3 needs-validation"
          onSubmit={handleSubmit}
          novalidate
        >
          {/*Razón social */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="razonsocial"
                class="col-sm-4 col-form-label text-start"
              >
                Razón Social
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="razonsocial"
                  name="razonsocial"
                  value={commerceData.razonsocial || ""}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Fantasía */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="fantasia"
                class="col-sm-4 col-form-label text-start"
              >
                Fantasía
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="fantasia"
                  name="fantasia"
                  value={commerceData.fantasia || ""}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Dirección */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="direccion"
                class="col-sm-4 col-form-label text-start"
              >
                Dirección
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="direccion"
                  name="direccion"
                  value={commerceData.direccion || ""}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Ciudad */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="ciudad"
                class="col-sm-4 col-form-label text-start"
              >
                Ciudad
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="ciudad"
                  name="ciudad"
                  value={commerceData.ciudad || ""}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Provincia */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label class="col-sm-4 col-form-label text-start" for="province">
                Provincia
              </label>
              <div class="col-sm-8">
                <select
                  className="form-select"
                  required
                  value={
                    commerceData && commerceData.Province
                      ? commerceData.Province.descProvince
                      : ""
                  }
                  onChange={handleChange}
                  id="province"
                  name="province"
                >
                  <option value="" disabled>
                    Selecciona una provincia
                  </option>
                  {allProvinces?.map((province, index) => (
                    <option key={index} value={province.descProvince}>
                      {province.descProvince}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/*Teléfono */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="telefono"
                class="col-sm-4 col-form-label text-start"
              >
                Teléfono
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="telefono"
                  name="telefono"
                  value={commerceData.telefono || ""}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Celular */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="celular"
                class="col-sm-4 col-form-label text-start"
              >
                Celular
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="celular"
                  name="celular"
                  value={commerceData.celular || ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Email */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label htmlFor="email" class="col-sm-4 col-form-label text-start">
                Email
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="email"
                  name="email"
                  value={commerceData.email || ""}
                  required
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Instagram */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="instagram"
                class="col-sm-4 col-form-label text-start"
              >
                Instagram
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="instagram"
                  name="instagram"
                  value={commerceData.instagram || ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          {/*Facebook */}
          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                htmlFor="facebook"
                class="col-sm-4 col-form-label text-start"
              >
                Facebook
              </label>
              <div class="col-sm-8">
                <input
                  type="text"
                  class="form-control"
                  id="facebook"
                  name="facebook"
                  value={commerceData.facebook || ""}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
          </div>

          <div class="col-sm-12">
            <div class="mb-3 row">
              <label
                class="col-sm-4 col-form-label text-start"
                htmlFor="isMyCommerce"
              >
                Es mi comercio
              </label>
              <div class="col-sm-8">
                <div class="form-check">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    id="isMyCommerce"
                    name="isMyCommerce"
                    value={commerceData.isMyCommerce || true}
                    checked={commerceData.isMyCommerce || true}
                    disabled
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="col-12">
            <button class="btn btn-primary" type="submit">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CommerceEdit;
