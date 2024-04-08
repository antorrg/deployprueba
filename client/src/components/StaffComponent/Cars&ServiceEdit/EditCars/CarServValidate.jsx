
const ValidCar = (input) => {
  let errors = {};

  // Validaciones para el campo de la patente
  if (!input.patent.trim()) {
    errors.patent = "Este campo no puede estar vacio";
  } 
   else if (input.patent.length >= 8) {
    errors.patent = "La patente es demasiado larga";
  }

  // Validaciones para el campo de la marca
 else if (!input.mark.trim()) {
    errors.mark = "Este campo no puede estar vacio";
  }  else if (input.mark.length < 3) {
    errors.password = "La marca debe tener al menos 3 caracters";
  }
    // Validaciones para el campo del modelo
   else if (!input.model.trim()) {
        errors.model = "Este campo no puede estar vacio";
      }  else if (input.model.length < 2) {
        errors.model = "El modelo debe tener al menos 2 caracteres";
      }
    // Validaciones para el campo del año
   else if (!input.year.trim()) {
        errors.year = "Este campo no puede estar vacio";
      }  else if (input.year.length < 4) {
        errors.year = "El año debe tener al menos 4 caracteres";
      }else if (input.year.length > 4){
      errors.year = "El año debe tener no mas de 4 caracters";
      }
      // Validaciones para el campo del numero de motor
   else if (!input.motorNum.trim()) {
        errors.motorNum = "Este campo no puede estar vacio";
      }  else if (input.motorNum.length < 4) {
        errors.motorNum = "El numero de motor debe tener al menos 4 caracteres";
      }
      // Validaciones para el campo del numero de chasis
   else if (!input.chassisNum.trim()) {
        errors.chassisNum = "Este campo no puede estar vacio";
      }  else if (input.chassisNum.length < 4) {
        errors.chassisNum = "El numero de chasis debe tener al menos 4 caracteres";
      }
      // Validaciones para el campo de observaciones
    else if (!input.observations.trim()) {
        errors.observations = "Este campo no puede estar vacio";
      }  else if (input.observations.length < 10) {
        errors.observations = "Este campo debe tener al menos 10 caracteres";
      }else if (input.observations.length > 500){
      errors.observations = "Este campo no debe tener mas de 500 caracters";
      }
  return errors;
};

export default ValidCar;