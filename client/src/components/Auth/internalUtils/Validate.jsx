import { useSelector } from "react-redux";

const ValidLogin = (input) => {
  let errors = {};

  // Using Regular Expressions to validate the appropriate use
  const validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  const validPass = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // Validaciones para el campo de email
  if (!input.email.trim()) {
    errors.email = "Ingresa un email";
  } else if (!validEmail.test(input.email.trim())) {
    errors.email = "Formato de email no válido";
  } else if (input.email.length >= 50) {
    errors.email = "El email es demasiado largo";
  }

  // Validaciones para el campo de contraseña
  if (!input.password.trim()) {
    errors.password = "Ingresa tu contraseña";
  } else if (!validPass.test(input.password.trim())) {
    errors.password =
      "La contraseña debe contener al menos una letra mayúscula y un dígito";
  } else if (input.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  }

  return errors;
};

const ValidCreate = (input) => {
  let errors = {};

  // Using Regular Expressions to validate the appropriate use
  const validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

  // Validaciones para el campo de email
  if (!input.email.trim()) {
    errors.email = "Ingresa un email";
  } else if (!validEmail.test(input.email.trim())) {
    errors.email = "Formato de email no válido";
  } else if (input.email.length >= 50) {
    errors.email = "El email es demasiado largo";
  }
  // Validaciones para el campo de name
  if (!input.name.trim()) {
    errors.name = "Este campo no pueda estar vacío";
  } else if (input.name.length < 8) {
    errors.name = "El nombre debe tener al menos 8 caracteres";
  }
  //Validaciones para el campo typeId:
  if (input.typeId === "") {
    errors.typeId = "Este campo no pueda estar vacío";
  } //Validaciones para el campo numberId:
  if (!input.numberId.trim()) {
    errors.numberId = "Este campo no pueda estar vacío";
  } else if (input.numberId.length < 6) {
    errors.numberId = "El número es demasiado corto.";
  }
  //Validaciones par el campo country.
  if (!input.country.trim()) {
    errors.country = "Este campo no pueda estar vacío";
  }

  return errors;
};

const ValidPass = (input) => {
  let errors = {};

  const validatePassword = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  // Validaciones para el campo de contraseña
  if (!input.newPassword.trim()) {
    errors.newPassword = "Este campo no puede estar vacio";
  } else if (!validatePassword.test(input.newPassword.trim())) {
    errors.newPassword =
      "La contraseña debe contener al menos una mayuscula y un numero";
  } else if (input.newPassword.length < 8) {
    errors.newPassword = "La contraseña debe tener mas de 8 letras";
  } else if (input.newPassword !== input.confirmPassword) {
    errors.confirmPassword = "Las contraseñas no coinciden";
  }
  return errors;
};

export { ValidLogin, ValidCreate, ValidPass };
// const ValidCreate = (input) => {
//   //   const allUsers = useSelector((state) => state.allUsers)
//   //  const all = allUsers.data
//   //  console.log(all)
//     let errors = {};

//     // Using Regular Expressions to validate the appropriate use
//     const validEmail = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
//     const validPass = /^(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
//    //const avoidRepetition = all.filter((email) => email.email === input.email);

//     // Validaciones para el campo de email
//     if (!input.email.trim()) {
//       errors.email = "This field cannot be empty";
//     // } else if (avoidRepetition.length !== 0) {
//     //   errors.email = "Please choose another email, it already exists";
//     } else if (!validEmail.test(input.email.trim())) {
//       errors.email = "Invalid email format";
//     } else if (input.email.length >= 50) {
//       errors.email = "The email is too long";
//     }
//     // Validaciones para el campo de contraseña
//     if (!input.password.trim()) {
//       errors.password = "This field cannot be empty";
//     } else if (!validPass.test(input.password.trim())) {
//       errors.password = "Password must contain at least one uppercase letter and one digit";
//     } else if (input.password.length < 8) {
//       errors.password = "Password must be at least 8 characters long";
//     } else if (input.password !== input.confirmPassword) {
//       errors.confirmPassword = "Passwords do not match";
//     }

//     return errors;
//   };
