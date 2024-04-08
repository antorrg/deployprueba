import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postFav } from "../../redux/actions";
import neumatico from "../../assets/neumatico.gif";
import GenericButton from "../../components/GenericButton/GenericButton";

const Consejos = () => {
  const dispatch = useDispatch();
  const postFavorites = useSelector((state) => state.postFav);

  useEffect(() => {
    dispatch(postFav());
  }, []);

  // Función para truncar el título si supera los 30 caracteres
  const truncateTitle = (title) => {
    if (title.length > 30) {
      return title.slice(0, 27) + "...";
    }
    return title;
  };
  return (
    <div
      className="container"
      style={{ marginTop: "40px", marginBottom: "40px" }}
    >
      <div style={{ margin: "30px" }}>
        <h2>Ten en cuenta estos Tips</h2>
      </div>

      <div className="row align-items-center justify-content-center">
        {postFavorites && postFavorites.length ? (
          postFavorites.map((tip) => (
            <div key={tip.id} style={{ width: "350px", margin: "10px" }}>
              <div
                className="align-items-center justify-content-center"
                style={{
                  height: "400px", // Alto del contenedor
                  border: "none !important",
                  overflow: "hidden", // Oculta el desbordamiento de la imagen
                }}
              >
                <img
                  src={tip.imgPost[0]}
                  className="card-img-top"
                  style={{
                    objectFit: "cover", // La imagen cubre el contenedor
                    width: "100%", // Ancho completo del contenedor
                    height: "100%", // Alto completo del contenedor
                  }}
                  alt={tip.titlePost}
                />
              </div>
              <div className="text-secondary">
                <h5 className="text-secondary fw-normal">
                  {truncateTitle(tip.titlePost)}
                </h5>
                <p
                  className="text-secondary fw-light"
                  style={{ height: "200px" }}
                >
                  {tip.textPost}
                </p>
                <GenericButton buttonText={"Ver más..."} disabled={false} />
              </div>
            </div>
          ))
        ) : (
          <div className="container">
            <img src={neumatico} alt="Cargando datos ..." />
          </div>
        )}
      </div>
    </div>
  );
};

export default Consejos;
