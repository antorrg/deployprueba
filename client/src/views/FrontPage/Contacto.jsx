import { useState } from "react";
import style from "./styles/Contacto.module.css";
import GenericButton from "../../components/GenericButton/GenericButton";
import {
  HandlError,
  showSuccess,
  showError,
} from "../../components/Auth/HandlerError";
import { validateEmail } from "./Auxiliar";
import showConfirmationDialog from "../../components/utils/sweetAlert";

const Contacto = () => {
  const initialInput = {
    name: "",
    email: "",
    subject: "",
    message: "",
  };
  const [input, setInput] = useState(initialInput);
  const [isSubmit, setIsSubmit] = useState(false);

  const [error, setError] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setError({
      ...error,
      [name]: validateEmail({ ...input, [name]: value })[name],
    });
  };

  const handleSubmit = async (e) => {
    const validationErrors = validateEmail(input);
    e.preventDefault();
    setError(validationErrors);
    if (
      Object.values(validationErrors).every((error) => error === "") &&
      isSubmit
    )
      setIsSubmit(true);

    const confirmed = await showConfirmationDialog(
      "¿Desea enviarnos un email? Confirme su accion"
    );
    if (confirmed) {
      // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
      try {
        console.log("enviando post", {
          name: input.name,
          email: input.email,
          subject: input.subject,
          message: input.message,
        });
        setInput(initialInput);
        showSuccess("Mensaje enviado exitosamente");
      } catch (error) {
        console.error(error);
        showError("Acontecio un error, mensaje no enviado");
        HandlError(error);
      }
    }
  };

  const permit =
    !input.name.trim() ||
    !input.email.trim() ||
    !input.subject.trim() ||
    !input.message.trim() ||
    error.name ||
    error.email ||
    error.subject ||
    error.message;

  return (
    <section
      className="container"
      style={{ marginTop: "40px", marginBottom: "40px" }}
    >
      <div>
        <div>
          <h2>Contactenos:</h2>
        </div>
        <div className="container col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-12">
                <input
                  name="name"
                  value={input.name}
                  className="form-control my-2"
                  type="text"
                  placeholder="Su nombre..."
                  onChange={handleOnChange}
                />
                {error.name && <p style={{ color: "red" }}>{error.name}</p>}
              </div>
              <div className="col-md-12">
                <input
                  name="email"
                  value={input.email}
                  className="form-control my-2"
                  type="email"
                  placeholder="Su email..."
                  onChange={handleOnChange}
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}
              </div>
              <div className="col-md-12">
                <input
                  name="subject"
                  value={input.subject}
                  className="form-control my-2"
                  type="text"
                  placeholder="Asunto..."
                  onChange={handleOnChange}
                />
                {error.subject && (
                  <p style={{ color: "red" }}>{error.subject}</p>
                )}
              </div>

              <div className="col-md-12">
                <textarea
                  name="message"
                  value={input.message}
                  className="form-control my-2"
                  placeholder="Su mensaje..."
                  onChange={handleOnChange}
                ></textarea>
                {error.message && (
                  <p style={{ color: "red" }}>{error.message}</p>
                )}
              </div>
            </div>
            <GenericButton
              type="submit"
              buttonText={"Enviar"}
              disabled={permit}
            />
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contacto;
