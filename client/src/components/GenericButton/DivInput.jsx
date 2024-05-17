export default function DivInput({
  labelText,
  name,
  value,
  error = "",
  handleChange,
  type = "text",
  labelWidth = 100,
  height = "std",
  arrayOptions = [["", "Selecciona un tipo"]],
  disabled = false,
}) {
  // labelWidth es el ancho para el label del formulario a renderizar, para que todos queden iguales y parejos

  // CSS para ocultar la barra de desplazamiento en el input type number
  const hideScrollbarCSS = `
    input[type=number]::-webkit-inner-spin-button,
    input[type=number]::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0; /* opcional: elimina el espacio extra */
    }
  `;

  //altura reducida de los Div y su interior
  const heigthSmall = 25;

  if (type === "area") {
    // renderizo un textarea
    return (
      <div className={height === "std" ? "my-2" : "my-0"}>
        <div className="input-group">
          <label
            className="input-group-text"
            style={{
              width: `${labelWidth}px`,
              height: height === "std" ? "" : `${heigthSmall}px`,
            }}
          >
            {labelText}
          </label>
          <textarea
            value={value}
            name={name}
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className="form-control"
            disabled={disabled}
          />
        </div>
        <div className="text-danger">{error}</div>
      </div>
    );
  } else if (type === "select") {
    //renderizo un select con las options
    return (
      <div className={height === "std" ? "my-2" : "my-0"}>
        <div className="input-group">
          <label
            className="input-group-text"
            style={{
              width: `${labelWidth}px`,
              height: height === "std" ? "" : `${heigthSmall}px`,
            }}
          >
            {labelText}
          </label>
          <select
            id={name}
            value={value}
            name={name}
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className="form-select"
            disabled={disabled}
            style={{ height: height === "std" ? "" : `${heigthSmall}px` }}
          >
            {arrayOptions.map((option) => (
              <option key={option[0]} value={option[0]}>
                {option[1]}
              </option>
            ))}
          </select>
        </div>
        <div className="text-danger">{error}</div>
      </div>
    );
  } else {
    // renderizo un input type text o number
    return (
      <div className={height === "std" ? "my-2" : "my-0"}>
        <style>{hideScrollbarCSS}</style>
        <div className="input-group">
          <label
            className="input-group-text"
            style={{
              width: `${labelWidth}px`,
              height: height === "std" ? "" : `${heigthSmall}px`,
            }}
          >
            {labelText}
          </label>
          <input
            type={type}
            value={value}
            name={name}
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className="form-control"
            disabled={disabled}
            style={{ height: height === "std" ? "" : `${heigthSmall}px` }}
          />
        </div>
        <div className="text-danger">{error}</div>
      </div>
    );
  }
}
