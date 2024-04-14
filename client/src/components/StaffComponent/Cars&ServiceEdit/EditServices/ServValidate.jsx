
const ValidServCreate = (input) => {
  let errors = {};

  if (!input.type.trim()) {
    errors.type = "Este campo no puede estar vacio";
  } 
  // Validaciones para el campo del detalle
  else if (!input.detail.trim()) {
    errors.detail = "Este campo no puede estar vacio";
  } 
   else if (input.detail.length >= 100) {
    errors.detail = "El detalle es demasiado largo";
  }
  //Validaciones para el campo de la fecha de entrada:
   else if (!input.date_in.trim()) {
    errors.date_in = "Este campo no puede estar vacío";
  } else {
    // Validar si la fecha de entrada es válida utilizando el objeto Date
    const dateIn = new Date(input.date_in);
    if (isNaN(dateIn.getTime())) {
      errors.date_in = "Formato de fecha inválido";
    }
  }
    //Validaciones para el campo de la fecha de Salida:
    
      // Validar si la fecha de entrada es válida utilizando el objeto Date
      const dateIn = new Date(input.date_in);
      if (isNaN(dateIn.getTime())) {
        errors.date_in = "Formato de fecha inválido";
      }
      // Validaciones para el campo de observaciones
    if (!input.observations.trim()) {
        errors.observations = "Este campo no puede estar vacio";
      }  else if (input.observations.length < 5) {
        errors.observations = "Este campo debe tener al menos 5 caracteres";
      }else if (input.observations.length > 500){
      errors.observations = "Este campo no debe tener mas de 500 caracters";
      }
  return errors;
};

export default ValidServCreate;