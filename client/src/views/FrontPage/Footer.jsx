import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import boscarol from '../../assets/images/BoscarolHnos.png'
import { isMyCommerce } from "../../redux/actions";

const Footer = () => {
  const dispatch = useDispatch();
  const myCommerce = useSelector((state) => state.myCommerce);

  useEffect(() => {
    dispatch(isMyCommerce());
  }, []);

 // console.log(myCommerce);
  return (
    <div className="container text-light bg-secondary pb-3">
      {myCommerce && Object.keys(myCommerce).length > 0 ? (
        <div className="row">
          <div className="col text-start">
            <h5 style={{ marginBottom: "2px", marginTop: "2px" }}>
              {myCommerce.razonsocial}
            </h5>
            <p style={{ marginBottom: "2px", marginTop: "2px" }}>
              {myCommerce.direccion} ({myCommerce.ciudad} -{" "}
              {myCommerce.Province.descProvince})
            </p>
          </div>
          <div className="col container">
            {/* style={{ border: "1px solid" }} */}
            <div
              className="container"
              style={{
                width: "200px",
              }}
            >
              <img
                src={boscarol}
                style={{ objectFit: "cover", width: "100%" }}
                alt="Logo taller Boscarol Hnos"
              />
            </div>
            <div>
              {myCommerce.instagram && (
                <span>
                  <a
                    href={myCommerce.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <i
                      className="bi bi-instagram"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </a>
                </span>
              )}
              <span> </span>
              {myCommerce.facebook && (
                <span style={{ marginLeft: "5px" }}>
                  <a
                    href={myCommerce.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "inherit", textDecoration: "none" }}
                  >
                    <i
                      className="bi bi-facebook"
                      style={{ fontSize: "2rem" }}
                    ></i>
                  </a>
                </span>
              )}
            </div>
          </div>

          <div className="col text-start">
            {myCommerce.telefono && (
              <p style={{ marginBottom: "2px", marginTop: "2px" }}>
                Tel: {myCommerce.telefono}
              </p>
            )}
            {myCommerce.celular && (
              <p style={{ marginBottom: "2px", marginTop: "2px" }}>
                Cel: {myCommerce.celular}
              </p>
            )}
            {myCommerce.email && (
              <p style={{ marginBottom: "2px", marginTop: "2px" }}>
                email: {myCommerce.email}
              </p>
            )}
          </div>
        </div>
      ) : (
        <img src={boscarol} alt="Logo taller Boscarol Hnos" />
      )}
      <div style={{ marginBottom: "20px" }}></div>
    </div>
  );
};

export default Footer;
