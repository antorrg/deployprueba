import { FiMail, FiMapPin } from "react-icons/fi";

const contact = [
    {
      icon: <FiMail />,
      title: "Tiene una pregunta?",
      subtitle: "Respondemos a la brevedad",
      description: "Envienos un e-mail a pepitotukis@nose.com",
    },
    {
      icon: <FiMapPin />,
      title: "Ubicacion",
      subtitle: "Buenos Aires, Argentina",
      description: "Estamos a su servicio",
    },
  ];

  const validateEmail = (input) => {
    const error = {};
    if (!input.name) {
      error.name = "Necesita un nombre";
    }
    if (!input.email) {
      error.email = "Necesita un email";
    } else if (!(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(input.email))) {
      error.email = "El email no es valido";
    }

    if (!input.subject) {
      error.subject = "Necesita un asunto";
    }
    if (!input.message) {
      error.message = "Necesita un mensaje";
    }
    return error;
  };

  export {
        contact, 
        validateEmail
  };