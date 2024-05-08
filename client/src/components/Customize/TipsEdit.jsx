import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  deleteCategoryTips,
  getAllCategoryTips,
  getAllTipsFull,
  postNewCategoryTips,
  postTips,
  updateCategoryTips,
  updateTips,
} from "../../redux/actions";
import Swal from "sweetalert2";
import DivImageCustom from "./DivImageCustom";
import validateImage from "../utils/ImageValidator";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { imagesDB } from "../../firebase/firebaseConfig";

//url de la imagen por defecto cuando el usuario no selecciona otra
const imgDefaultLogo =
  "https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/blog%2Fboscarolimgdefault.png?alt=media&token=50ae4716-3e06-4d0d-a485-b29e0d4c52c6";

//MODAL
function Modal({ onClose, tip, allCategories }) {
  const dispatch = useDispatch();
  const [tipEdited, setTipEdited] = useState(tip);
  const [tipOriginal, setTipOriginal] = useState(tip);

  //configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
  const minWidthAccepted = 100;
  const maxWidthAccepted = 800;
  const minHeightAccepted = 100;
  const maxHeigthAccepted = 800;
  const minSizeKBaccepted = 40;
  const maxSizeKBaccepted = 800;

  //configuramos longitudes de cadenas (caracteres) para los input
  const maxLengthTitle = 30;
  const maxLengthText = 300;

  //handle eventos om Change de input y demás
  const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    if (property === "CategoryPost") {
      setTipEdited({
        ...tipEdited,
        CategoryPost: { ...tipEdited.CategoryPost, descCategory: value },
      });
    } else {
      setTipEdited({ ...tipEdited, [property]: value });
    }
  };

  //handle para el cierre del Modal cuando se hace clic fuera del mismo
  const handleCloseOutside = (event) => {
    if (event.target.classList.contains("modal")) {
      handleOnClose();
    }
  };

  //handle Delete Imagen
  const handleDeleteImage = () => {
    setTipEdited({ ...tipEdited, imgPost: [imgDefaultLogo] });
    handleImageClick(0);
  };

  const handleImageClick = (index) => {
    document.getElementById(`fileInput${index}`).click();
  };

  const handleFileChange = async (index, event) => {
    try {
      const file = event.target.files[0];
      // Verificar si se selecciona un archivo
      if (!file) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se seleccionó ningún archivo.",
          //footer: '<a href="#">Why do I have this issue?</a>',
        });
        return;
      }

      // Verificar si la extensión del archivo es válida
      const validExtensions = ["jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !validExtensions.includes(extension) ||
        file.type.indexOf("image/") !== 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg y png.",
          //footer: '<a href="#">Why do I have this issue?</a>',
        });
        return;
      }

      // Llama a la función de validación antes de subir la imagen
      //validamos ancho, alto y tamaño de la imagen. Si todo está bien continua la ejecución. Si no, va al bloque catch.
      await validateImage(
        file,
        minWidthAccepted,
        maxWidthAccepted,
        minHeightAccepted,
        maxHeigthAccepted,
        minSizeKBaccepted,
        maxSizeKBaccepted
      );

      //subir la imagen a una carpeta temporal en Storage
      const storageRef = ref(imagesDB);
      const fileRef = ref(storageRef, `blog/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      setTipEdited({ ...tipEdited, imgPost: [url] });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de vuelta.",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }
  };

  //verificamos si hubo cambios o no
  function areObjectsEqual(obj1, obj2) {
    // Iterar sobre las claves de un objeto
    for (let key in obj1) {
      // Verificar si la propiedad existe en ambos objetos
      if (!obj2.hasOwnProperty(key)) {
        return false;
      }
      // Verificar si los valores de las propiedades son diferentes
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    // Si todas las propiedades y sus valores son iguales, los objetos son iguales
    return true;
  }

  // handler para almacenar los datos en la BD
  const handleSubmit = async (e) => {
    e.preventDefault();

    //si no hubo cambios y se pretende guardar, no hacer nada
    if (areObjectsEqual(tipOriginal, tipEdited)) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "No hubo modificaciones",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }
    //si hubo cambio en categorías, buscar el CategoryPostIdCategory
    if (!areObjectsEqual(tipOriginal.CategoryPost, tipEdited.CategoryPost)) {
      for (let index = 0; index < allCategories.length; index++) {
        if (
          tipEdited.CategoryPost.descCategory ===
          allCategories[index].descCategory
        ) {
          tipEdited.CategoryPostIdCategory = allCategories[index].idCategory;
        }
      }
    }

    //verificar que haya alguna imagen, si no asignar la imagen por defecto a tipEdited
    async function check() {
      let exit = false;
      let updateImg = false;
      if (tipEdited.imgPost.length === 0) {
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "btn btn-success m-1",
            cancelButton: "btn btn-danger m-1",
          },
          buttonsStyling: false,
        });
        await swalWithBootstrapButtons
          .fire({
            title: "No tienes imagen!",
            text: "Se publicará con tu logo por defecto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "De acuerdo",
            cancelButtonText: "No, espera...",
            reverseButtons: false,
          })
          .then((result) => {
            if (result.isConfirmed) {
              //!asignar logo por defecto a tipEdited
              //aqui debería eliminar la imagen descartada, pero primero
              //tendría que ver si no está asignada a otro Tips.
              //entonces recorrer la BD

              // Obtener la referencia al archivo utilizando la URL
              //?const imageRef = storage.refFromURL(imageUrl);
              // Eliminar el archivo
              //?await imageRef.delete();
              updateImg = true;
            } else if (result.dismiss === Swal.DismissReason.cancel) {
              //detener la secuencia de código
              exit = true;
              return; //no funciona esto aquí
            }
          });
      }
      //salir, dependiendo de la respuesta en el swal anterior
      if (exit) return;
    }

    //guardar los datos en la BD y salir del Modal
    await dispatch(updateTips(tipEdited.idPost, tipEdited));
    await dispatch(getAllTipsFull());
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Tip actualizado",
      showConfirmButton: false,
      timer: 1500,
    });

    onClose();
  };

  //handle Salir del Modal, primero comprueba si hubo cambios sin guardar
  const handleOnClose = async () => {
    if (areObjectsEqual(tipOriginal, tipEdited)) {
      onClose();
    } else {
      Swal.fire({
        title: "Salir?",
        text: "Tienes cambios sin guardar. Salir de todos modos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, y descartar.",
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });
    }
  };
  return (
    <div className="modal" tabindex="-1" onClick={handleCloseOutside}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Tips</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleOnClose}
            ></button>
          </div>
          <form
            className="row g-3 needs-validation"
            onSubmit={handleSubmit}
            novalidate
          >
            <div className="modal-body">
              {/*Titulo */}
              <div className="col-sm-12">
                <div className="mb-3 row">
                  <label
                    htmlFor="titlePost"
                    className="col-sm-2 col-form-label text-start"
                  >
                    Título
                  </label>
                  <div className="col-sm-7">
                    <input
                      type="text"
                      className="form-control"
                      id="titlePost"
                      name="titlePost"
                      maxLength={maxLengthTitle}
                      value={
                        tipEdited && tipEdited.titlePost
                          ? tipEdited.titlePost
                          : ""
                      }
                      required
                      onChange={handleChange}
                    ></input>
                  </div>
                  <label className="col-sm-3 col-form-label text-start">{`${tipEdited.titlePost.length} de ${maxLengthTitle}`}</label>
                </div>
              </div>

              <div className="col-sm-12 ">
                {/*Imagen */}
                <div className="mb-3 row">
                  <div className="col-sm-5 d-flex justify-content-center align-items-center ">
                    <DivImageCustom
                      image={
                        tipEdited && tipEdited.imgPost
                          ? tipEdited.imgPost[0]
                          : null
                      }
                      key={0}
                      index={0}
                      refItem={0}
                      handleImageClick={() => handleImageClick(0)}
                      handleFileChange={handleFileChange}
                      handleDeleteImage={handleDeleteImage}
                    />
                  </div>
                  {/*Descripción */}
                  <div className="col-sm-7 ">
                    <label
                      htmlFor="textPost"
                      className="col-sm-12 col-form-label text-center"
                    >
                      Descripción
                    </label>
                    <div className="col-sm-12">
                      <textarea
                        cols="30"
                        rows="8"
                        className="form-control text-start"
                        id="textPost"
                        name="textPost"
                        maxLength={maxLengthText}
                        value={
                          tipEdited && tipEdited.textPost
                            ? tipEdited.textPost
                            : ""
                        }
                        required
                        onChange={handleChange}
                      ></textarea>
                    </div>
                    <label className="col-sm-12 col-form-label text-center">{`${tipEdited.textPost.length} de ${maxLengthText}`}</label>
                  </div>
                </div>
              </div>

              {/*Categorias */}
              <div className="col-sm-12">
                <div className="mb-3 row">
                  <label
                    className="col-sm-3 col-form-label text-start"
                    htmlFor="category"
                  >
                    Categorías
                  </label>
                  <div className="col-sm-9">
                    <select
                      className="form-select"
                      required
                      value={
                        tipEdited && tipEdited.CategoryPost
                          ? tipEdited.CategoryPost.descCategory
                          : ""
                      }
                      onChange={handleChange}
                      id="CategoryPost"
                      name="CategoryPost"
                    >
                      <option value="" disabled>
                        Selecciona una Categoría
                      </option>
                      {allCategories?.map((category, index) => (
                        <option key={index} value={category.descCategory}>
                          {category.descCategory}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <p>Recuerda guardar los cambios.</p>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Guardar cambios
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleOnClose}
              >
                Cerrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

//EDIT CATEGORIES
function EditCategories({ onClose, allCategories }) {
  const [editingCategories, setEditingCategories] = useState([]);
  const [nameCat, setNameCat] = useState({});
  const [newCateg, setNewCateg] = useState("");
  const dispatch = useDispatch();
  //const [errors, setErrors] = useState({});

  //handle Salir del Modal, primero comprueba si hubo cambios sin guardar
  const handleOnClose = async () => {
    // if (areObjectsEqual(tipOriginal, tipEdited)) {
    //   onClose();
    // } else {
    //   Swal.fire({
    //     title: "Salir?",
    //     text: "Tienes cambios sin guardar. Salir de todos modos?",
    //     icon: "warning",
    //     showCancelButton: true,
    //     confirmButtonColor: "#3085d6",
    //     cancelButtonColor: "#d33",
    //     confirmButtonText: "Si, y descartar.",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       onClose();
    //     }
    //   });
    // }
    onClose();
  };

  const handleChange = (id, name, value) => {
    setNameCat((prevNameCat) => ({ ...prevNameCat, [name]: value }));

    if (name === "newCategory") {
      setNewCateg(value);
      //setErrors(validationsCategories({ ...nameCat, [name]: value }));
    } else {
      //setErrors(validationsCategories({ ...nameCat, [name]: value }));
    }
  };
  const handleEdit = (id, name) => {
    // Agrega el ID a la lista de categorías en modo de edición
    setEditingCategories((prevEditingCategories) => [
      ...prevEditingCategories,
      id,
    ]);
  };

  const handleCancelEdit = (id) => {
    // Remueve el ID de la lista de categorías en modo de edición
    setEditingCategories((prevEditingCategories) =>
      prevEditingCategories.filter((categoryId) => categoryId !== id)
    );
  };

  const handleDelete = async (id) => {
    await dispatch(deleteCategoryTips(id));
  };

  const handleGuardar = async (id, newCateg) => {
    if (newCateg) {
      await dispatch(postNewCategoryTips(newCateg));

      // Limpiar el input y reiniciar el estado de errores
      setNewCateg("");
      //setErrors({});
    } else {
      alert("Debes ingresar un nombre para la categoría.");
    }
  };

  const handleSaveEdit = async (id, name) => {
    // Aquí puedes implementar la lógica para guardar la edición
    // Por ejemplo, puedes llamar a tu acción de Redux updateType
    // y luego remover la categoría de la lista de edición
    await dispatch(updateCategoryTips(id, { nameCategoryPost: name }));
    await dispatch(getAllCategoryTips());
    await dispatch(getAllTipsFull());
    // Remueve el ID de la lista de categorías en modo de edición
    setEditingCategories((prevEditingCategories) =>
      prevEditingCategories.filter((categoryId) => categoryId !== id)
    );
  };
  return (
    <div className="modal" tabindex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Categorías</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleOnClose}
            ></button>
          </div>
          <div className="modal-body">
            <table>
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Detalle</th>
                  <th scope="col">Acción</th>
                </tr>
              </thead>
              <tbody>
                {allCategories.map((type) => (
                  <tr key={type.idCategory}>
                    <td>{type.idCategory}</td>
                    <td>
                      {editingCategories.includes(type.idCategory) ? (
                        <input
                          type="text"
                          name={type.descCategory}
                          id={type.idCategory}
                          value={
                            nameCat[type.descCategory] !== undefined
                              ? nameCat[type.descCategory]
                              : type.descCategory
                          }
                          onChange={(e) =>
                            handleChange(
                              type.idCategory,
                              type.descCategory,
                              e.target.value
                            )
                          }
                          maxLength={20}
                        />
                      ) : (
                        <div className="d-flex justify-content-start">
                          <span>{type.descCategory}</span>
                        </div>
                      )}
                    </td>

                    <td>
                      {editingCategories.includes(type.idCategory) ? (
                        <>
                          <i //disabled={!!errors[type.descCategory]}
                            style={{ cursor: "pointer", margin: "10px" }}
                            onClick={
                              nameCat[type.descCategory] === "" ||
                              allCategories.some(
                                (cat) =>
                                  cat.descCategory ===
                                  nameCat[type.descCategory]
                              )
                                ? null
                                : () =>
                                    handleSaveEdit(
                                      type.idCategory,
                                      nameCat[type.descCategory]
                                    )
                            }
                            className="bi bi-floppy fs-5"
                          ></i>
                          <i
                            className="bi bi-x-square fs-5"
                            onClick={() => handleCancelEdit(type.idCategory)}
                            style={{ cursor: "pointer" }}
                          ></i>
                        </>
                      ) : (
                        <i
                          className="bi bi-pencil"
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleEdit(type.idCategory, type.descCategory)
                          }
                        ></i>
                      )}
                    </td>
                    <td>
                      <i
                        className="bi bi-trash3 fs-5 mx-2 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDelete(type.idCategory)}
                      ></i>
                    </td>
                    <td>{/* <span> {errors[type.name]}</span> */}</td>
                  </tr>
                ))}
                <tr></tr>
                <tr>
                  <td>
                    <i className="bi bi-plus-circle fs-5"></i>
                  </td>
                  <td>
                    <input
                      style={{
                        color: allCategories.some(
                          (cat) => cat.descCategory === newCateg
                        )
                          ? "red"
                          : "initial",
                      }}
                      type="text"
                      id="newCategory"
                      name="newCategory"
                      value={newCateg}
                      onChange={(e) =>
                        handleChange(e.target.id, e.target.name, e.target.value)
                      }
                      placeholder="Nueva categoría"
                      maxLength={20}
                    />
                  </td>
                  <td>
                    <i
                      className="bi bi-floppy fs-5"
                      onClick={() => handleGuardar(null, newCateg)}
                      style={{ cursor: "pointer" }}
                      hidden={
                        newCateg.length < 3 ||
                        allCategories.some(
                          (cat) => cat.descCategory === newCateg
                        )
                      }
                      // disabled={!!errors.newCategory || newCateg.trim() === ""}
                    ></i>
                  </td>
                  {/* <td> {errors.newCategory}</td> */}
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            {/* <button type="button" className="btn btn-primary">
              Save changes
            </button> */}
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={handleOnClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

//MODAL para crear un nuevo Tips
function NewTips({ onClose, allCategories }) {
  const init = {
    imgPost: [imgDefaultLogo],
    published: false,
    viewFavPost: false,
  };
  const [newTip, setNewTip] = useState({ ...init });
  const [original, setOriginal] = useState({ ...init });
  const dispatch = useDispatch();

  //configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
  const minWidthAccepted = 100;
  const maxWidthAccepted = 800;
  const minHeightAccepted = 100;
  const maxHeigthAccepted = 800;
  const minSizeKBaccepted = 40;
  const maxSizeKBaccepted = 800;

  //configuramos longitudes de cadenas (caracteres) para los input
  const maxLengthTitle = 30;
  const maxLengthText = 300;
  const handleCloseOutside = (event) => {
    if (event.target.classList.contains("modal")) {
      handleOnClose();
    }
  };

  const handleOnClose = async () => {
    //no cambiar el orden en que se pasan los argumentos
    if (areObjectsEqual(newTip, original)) {
      onClose();
    } else {
      Swal.fire({
        title: "Salir?",
        text: "Tienes cambios sin guardar. Salir de todos modos?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, y descartar.",
      }).then((result) => {
        if (result.isConfirmed) {
          onClose();
        }
      });
    }
  };

  //verificamos si hubo cambios o no
  function areObjectsEqual(obj1, obj2) {
    // Iterar sobre las claves de un objeto
    for (let key in obj1) {
      // Verificar si la propiedad existe en ambos objetos
      if (!obj2.hasOwnProperty(key)) {
        return false;
      }
      // Verificar si los valores de las propiedades son diferentes
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }
    // Si todas las propiedades y sus valores son iguales, los objetos son iguales
    return true;
  }

  const handleChange = (event) => {
    const property = event.target.name;
    let value = event.target.value;

    // Si es un checkbox, establece el valor como el estado del checkbox
    if (event.target.type === "checkbox") {
      value = event.target.checked;
    }

    // Si es un select o un input de texto, establece el valor como el valor del elemento
    if (
      event.target.tagName.toLowerCase() === "select" ||
      event.target.type === "text"
    ) {
      value = event.target.value;
    }

    // Si pongo en true Favorito, debo también publicarlo si no está publicado
    if (event.target.name === "viewFavPost" && event.target.checked) {
      if (!newTip.published)
        Swal.fire("Al marcar como favorito también se publicará");
      setNewTip({ ...newTip, [property]: value, published: true });
    } else if (event.target.name === "published" && !event.target.checked) {
      //si lo quito de publicado, tengo que sacarlo de Fav
      setNewTip({ ...newTip, [property]: value, viewFavPost: false });
    } else {
      // Si no actualiza newTip normalmente
      setNewTip({ ...newTip, [property]: value });
    }
  };

  const handleImageClick = (index) => {
    document.getElementById("imgFile").click();
  };

  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];
      // Verificar si se selecciona un archivo
      if (!file) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "No se seleccionó ningún archivo.",
          //footer: '<a href="#">Why do I have this issue?</a>',
        });
        return;
      }

      // Verificar si la extensión del archivo es válida
      const validExtensions = ["jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !validExtensions.includes(extension) ||
        file.type.indexOf("image/") !== 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg y png.",
          //footer: '<a href="#">Why do I have this issue?</a>',
        });
        return;
      }

      // Llama a la función de validación antes de subir la imagen
      //validamos ancho, alto y tamaño de la imagen. Si todo está bien continua la ejecución. Si no, va al bloque catch.
      await validateImage(
        file,
        minWidthAccepted,
        maxWidthAccepted,
        minHeightAccepted,
        maxHeigthAccepted,
        minSizeKBaccepted,
        maxSizeKBaccepted
      );

      //subir la imagen a una carpeta Storage
      const storageRef = ref(imagesDB);
      const fileRef = ref(storageRef, `blog/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);

      setNewTip({ ...newTip, imgPost: [url] });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de vuelta.",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //buscar el CategoryPostIdCategory
    let idCategory;
    for (let index = 0; index < allCategories.length; index++) {
      if (newTip.CategoryPost === allCategories[index].descCategory) {
        idCategory = allCategories[index].idCategory;
      }
    }
    const dataSend = {
      //datePost: new Date(),
      titlePost: newTip.titlePost,
      textPost: newTip.textPost,
      imgPost: [newTip.imgPost[0]],
      idCategory: idCategory,
      published: newTip.published,
      viewFavPost: newTip.viewFavPost,
    };
    try {
      //guardar los datos en la BD y salir del Modal
      await dispatch(postTips(dataSend));
      await dispatch(getAllTipsFull());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Tip guardado/publicado",
        showConfirmButton: false,
        timer: 1500,
      });

      onClose();
    } catch (error) {
      console.error("Ocurrió un error");
    }
  };

  return (
    <div className="modal" tabindex="-1" onClick={handleCloseOutside}>
      <div className="modal-dialog">
        <div
          className="modal-content modal-dialog-scrollable"
          style={{ maxHeight: "70vh", overflow: "auto" }}
        >
          <form class="needs-validation" onSubmit={handleSubmit} novalidate>
            <div className="modal-header">
              <h5 className="modal-title">Crea un nuevo Tips</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleOnClose}
              ></button>
            </div>
            <div className="modal-body">
              {/*cuerpo del Modal */}
              <div className="card" style={{ width: "18rem" }}>
                <img
                  src={newTip.imgPost ? newTip.imgPost[0] : imgDefaultLogo}
                  className="card-img-top"
                  style={{ cursor: "pointer" }}
                  alt="Imagen nuevo Tips"
                  name="imgPost"
                  id="imgPost"
                  onClick={handleImageClick}
                />
                <div className="card-body d-flex flex-column">
                  {/*Título */}
                  <input
                    className="form-control mb-2"
                    placeholder="Ingresa un título"
                    type="text"
                    maxLength={maxLengthTitle}
                    name="titlePost"
                    id="titlePost"
                    onChange={handleChange}
                    value={newTip.titlePost ? newTip.titlePost : ""}
                    required
                  />
                  {/*Descripción */}
                  <textarea
                    placeholder="Ingresa la descripción"
                    name="textPost"
                    id="textPost"
                    cols="30"
                    rows="8"
                    maxLength={maxLengthText}
                    onChange={handleChange}
                    value={newTip.textPost ? newTip.textPost : ""}
                    className="form-control"
                    required
                  ></textarea>
                  <span>{`${
                    newTip.textPost && newTip.textPost.length
                      ? newTip.textPost.length
                      : "0"
                  } de ${maxLengthText}`}</span>
                </div>
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <select
                      className="form-select"
                      required
                      value={
                        newTip && newTip.CategoryPost ? newTip.CategoryPost : ""
                      }
                      onChange={handleChange}
                      id="CategoryPost"
                      name="CategoryPost"
                    >
                      <option value="" disabled>
                        Selecciona una Categoría
                      </option>
                      {allCategories?.map((category, index) => (
                        <option key={index} value={category.descCategory}>
                          {category.descCategory}
                        </option>
                      ))}
                    </select>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    {/*publicar */}
                    <div className="d-flex justify-content-start ms-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="published"
                          id="published"
                          checked={newTip.published ? newTip.published : false}
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="">
                          Publicarlo
                        </label>
                      </div>
                    </div>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    {/*favorito */}
                    <div className="d-flex justify-content-start ms-3">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          name="viewFavPost"
                          id="viewFavPost"
                          checked={
                            newTip.viewFavPost ? newTip.viewFavPost : false
                          }
                          onChange={handleChange}
                        ></input>
                        <label className="form-check-label" htmlFor="">
                          Favorito
                        </label>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                Guardar/Publicar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleOnClose}
              >
                Cerrar
              </button>
              <input
                type="file"
                id="imgFile"
                accept=".jpg, .jpeg, .png"
                style={{ display: "none" }}
                onChange={(e) => handleFileChange(e)}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function TipsEdit() {
  const dispatch = useDispatch();
  const allTips = useSelector((state) => state.allTips);
  const allCategoryTips = useSelector((state) => state.allCategoryTips);
  const [catUniques, setCatUniques] = useState([]); //nombre de las categorías, sólo las que están presentes en allTips
  const [searchTerm, setSearchTerm] = useState(""); //estado para los términos de búsqueda, filtrado reactivo
  const [filteredTips, setFilteredTips] = useState([]); // Estado para los tips filtrados qu se mapean
  const [filterPublished, setFilterPublished] = useState(true);
  const [filterFavorite, setFilterFavorite] = useState(false);
  const [categorySelected, setCategorySelected] = useState([]);
  const [order, setOrder] = useState({
    date: { text: "", order: "DESC" },
    title: { text: "", order: "DESC" },
  });
  const [modal, setModal] = useState(false);
  const [newTipModal, setNewTipModal] = useState(false);
  const [modalCategories, setModalCategories] = useState(false);
  const [tipModal, setTipModal] = useState({});

  useEffect(() => {
    dispatch(getAllTipsFull());
    dispatch(getAllCategoryTips());
  }, []);

  useEffect(() => {
    const uniqueCategories = () => {
      const uniq =
        allTips &&
        allTips
          .map((tip) => tip.CategoryPost?.descCategory)
          .filter(
            (category, index, self) =>
              category && self.indexOf(category) === index
          );

      return uniq.sort();
    };
    setCatUniques(uniqueCategories);
  }, [allTips, allCategoryTips]);

  useEffect(() => {
    if (allTips && allTips.length > 0) {
      // Aplicar los filtros sobre los tips originales
      const filterTips = (() => {
        let filtered = allTips.filter((tip) =>
          tip.titlePost.toLowerCase().includes(searchTerm.toLowerCase())
        );
        if (filterPublished !== null) {
          filtered = filtered.filter(
            (tip) => tip.published === filterPublished
          );
        }
        if (filterFavorite !== null) {
          filtered = filtered.filter(
            (tip) => tip.viewFavPost === filterFavorite
          );
        }
        if (categorySelected.length > 0) {
          filtered = filtered.filter(function (element) {
            return categorySelected.includes(element.CategoryPost.descCategory);
          });
        }

        return filtered;
      })();
      setFilteredTips(filterTips);

      setOrder({
        date: { text: "", order: "DESC" },
        title: { text: "", order: "DESC" },
      });
    }
  }, [allTips, searchTerm, filterPublished, filterFavorite, categorySelected]);

  //handle de los eventos de clic de botones de Orden
  const handleOrder = (event) => {
    //puede llegar como orderDate u orderTitle
    if (event.target.name === "orderDate") {
      if (order.date.order === "ASC") {
        setOrder({
          title: { text: "", order: "ASC" },
          date: { text: "\u25BC", order: "DESC" },
        });
        const sortedDesc = [...filteredTips].sort(
          (a, b) => new Date(b.datePost) - new Date(a.datePost)
        );
        setFilteredTips(sortedDesc);
      } else if (order.date.order === "DESC") {
        setOrder({
          title: { text: "", order: "ASC" },
          date: { text: "\u25B2", order: "ASC" },
        });
        const sortedAsc = [...filteredTips].sort(
          (a, b) => new Date(a.datePost) - new Date(b.datePost)
        );
        setFilteredTips(sortedAsc);
      }
    } else {
      //orderTitle
      if (order.title.order === "ASC") {
        setOrder({
          title: { text: "\u25BC", order: "DESC" },
          date: { text: "", order: "ASC" },
        });
        const sortedDesc = [...filteredTips].sort((a, b) =>
          b.titlePost.localeCompare(a.titlePost)
        );
        setFilteredTips(sortedDesc);
      } else if (order.title.order === "DESC") {
        setOrder({
          title: { text: "\u25B2", order: "ASC" },
          date: { text: "", order: "ASC" },
        });
        const sortedAsc = [...filteredTips].sort((a, b) =>
          a.titlePost.localeCompare(b.titlePost)
        );
        setFilteredTips(sortedAsc);
      }
    }
  };

  //handle de evento clic de Publicado en la CARD
  const handlePublish = async (id, event) => {
    //si vamos a quitar de Publicado, verificar que queden al menos 3
    if (event.target.checked) {
      //aquí sólo quiero publicarlo
      await dispatch(updateTips(id, { published: true, datePost: new Date() }));
      await dispatch(getAllTipsFull());
    } else {
      //si lo voy a quitar de Publicados, verificar que queden al menos 3 Pub y Fav
      const totalFavs = allTips.filter(
        (tip) => tip.viewFavPost === true
      ).length;
      const totalPublished = allTips.filter(
        (tip) => tip.published === true
      ).length;

      if (totalFavs <= 3 || totalPublished <= 3) {
        Swal.fire("Debemos mantener al menos 3 Tips publicados y 3 Favoritos");
      } else {
        await dispatch(
          updateTips(id, { published: false, viewFavPost: false })
        );
        await dispatch(getAllTipsFull());
      }
    }
  };

  //handle de evento clic de Publicado en la CARD
  const handleFavorite = async (id, event, published) => {
    let confirm = false;
    let salir = false;

    //si se va a marcar como favorito debe estar publicado
    if (event.target.checked && !published) {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success m-1",
          cancelButton: "btn btn-danger m-1",
        },
        buttonsStyling: false,
      });
      await swalWithBootstrapButtons
        .fire({
          title: "Tips no publicado",
          text: "Se publicará el Tips para marcarlo como Favorito",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "De acuerdo",
          cancelButtonText: "No, espera...",
          reverseButtons: false,
        })
        .then((result) => {
          if (result.isConfirmed) {
            confirm = true;
          } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
          ) {
            salir = true;
          }
        });
    }
    if (salir) return; //cancelamos la ejecución en el swal anterior

    if (confirm) {
      //confirmamos el swal anterior
      await dispatch(
        updateTips(id, {
          viewFavPost: true,
          published: true,
          datePost: new Date(),
        })
      );
      await dispatch(getAllTipsFull());
      return;
    }

    //si vamos a quitar de Favoritos, verificar que queden al menos 3 marcados como Favoritos
    if (event.target.checked) {
      //si lo voy a marcar como Fav, hacerlo y terminar
      await dispatch(updateTips(id, { viewFavPost: true }));
      await dispatch(getAllTipsFull());
      return;
    }

    const totalFavs = allTips.filter((tip) => tip.viewFavPost === true).length;
    const totalPublished = allTips.filter(
      (tip) => tip.published === true
    ).length;

    if (totalFavs <= 3 || totalPublished <= 3) {
      Swal.fire("Debemos mantener al menos 3 Tips publicados y 3 Favoritos");
    } else {
      await dispatch(updateTips(id, { viewFavPost: false }));
      await dispatch(getAllTipsFull());
    }
  };

  //handle para cerrar el Modal
  const handleOnClose = () => {
    setModal(false);
    setTipModal({});
    setModalCategories(false);
    setNewTipModal(false);
  };

  //handle para mostrar el Modal del Tip y cargar el tip a mostrar
  const handleClicModal = (event, tip) => {
    setTipModal(tip);
    setModal(true);
  };

  //handle para mostrar el Modal de Edit Categorías
  const handleClicModalCategories = () => {
    setModalCategories(true);
  };

  return (
    <div className="container align-items-center justify-content-center">
      <h4> Personaliza tu blog</h4>
      <div className="container w-75">
        <p>
          En esta sección podrás crear y modificar los Tips para tu blog o lista
          de consejos.
        </p>
      </div>
      <div className="d-flex flex-wrap">
        {/*barra de la IZQUIERDA */}
        <div
          className="container align-items-center col-md-3 pt-3 pb-3"
          style={{ minHeight: "200px" }}
        >
          {/* Nuevo TIPS */}
          <div className="my-3">
            <button
              className="btn btn-primary"
              type="button"
              name="viewModalNewTips"
              onClick={() => setNewTipModal(true)}
            >
              Nuevo Tips
            </button>
          </div>

          {/* input search */}
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <i className="bi bi-search"></i>
              </span>
            </div>
            <input
              type="text"
              className="form-control"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </div>
          {/*Switch Publicados*/}
          <div
            className="d-flex flex-row align-items-center  form-check form-switch border rounded my-3 bg-light bg-gradient p-0"
            style={{ height: "54px" }}
          >
            <input
              className="form-check-input"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckChecked"
              checked={filterPublished}
              onChange={(event) => setFilterPublished(event.target.checked)}
            ></input>
            <label
              className="form-check-label"
              htmlFor="flexSwitchCheckChecked"
            >
              Publicados
            </label>
          </div>
          {/*Switch Favoritos*/}
          <div
            className="d-flex flex-row align-items-center  form-check form-switch border rounded my-3 bg-light bg-gradient p-0"
            style={{ height: "54px" }}
          >
            <input
              className="form-check-input"
              style={{ marginLeft: "10px", marginRight: "10px" }}
              type="checkbox"
              role="switch"
              id="flexSwitchCheckFav"
              checked={filterFavorite}
              onChange={(event) => setFilterFavorite(event.target.checked)}
            ></input>
            <label className="form-check-label" htmlFor="flexSwitchCheckFav">
              Favoritos
            </label>
          </div>
          {/*Ordenamiento */}
          <div
            className="d-flex flex-column   form-check form-switch border rounded my-3 bg-light bg-gradient p-2"
            style={{ minHeight: "54px" }}
          >
            <p>Ordenamiento</p>
            <div className="d-flex flex-wrap justify-content-evenly">
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="orderDate"
                  onClick={handleOrder}
                >
                  Fecha {order.date.text}
                </button>
              </div>
              <div>
                <button
                  className="btn btn-primary"
                  type="button"
                  name="orderTitle"
                  onClick={handleOrder}
                >
                  Título{order.title.text}
                </button>
              </div>
            </div>
          </div>
          {/*Filter Categoies*/}
          <div className="d-flex flex-column text-secondary fw-normal align-items-start">
            <div className=" d-flex">
              <p>
                <b>
                  Categorías {"  "}
                  <i
                    className="bi bi-pencil fs-6"
                    style={{ cursor: "pointer" }}
                    onClick={handleClicModalCategories}
                  ></i>
                </b>
              </p>
            </div>
            {/*Categorias map*/}
            {catUniques?.map((cat, index) => (
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
            ))}
          </div>
        </div>
        {/* visualización de Card a la DERECHA*/}
        <div className="d-flex align-content-center justify-content-center flex-wrap col-md-9 gap-5 pt-3 pb-3">
          {allTips
            ? filteredTips.map((tip, index) => (
                <div
                  key={tip.idPost}
                  className="card text-secondary fw-normal shadow"
                  style={{ width: "250px" }}
                >
                  <div className="card-img-top cursor-pointer">
                    <img
                      src={tip.imgPost[0]}
                      className="card-img-top"
                      style={{ cursor: "pointer" }}
                      name={`img_${tip.idPost}`}
                      alt={tip.titlePost}
                      onClick={(event) => handleClicModal(event, tip)}
                    />
                  </div>
                  <div className="card-body">
                    <p className="card-title">
                      <b>{tip.titlePost}</b>
                    </p>
                    <p className="card-text">
                      {tip.textPost.length > 20
                        ? `${tip.textPost.substring(0, 80)}...`
                        : tip.textPost}
                    </p>
                  </div>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Categoría:
                      {tip.CategoryPost ? tip.CategoryPost.descCategory : null}
                    </li>
                    <li className="list-group-item">
                      Fecha guardado/publicado <br />
                      {tip.datePost}
                    </li>
                  </ul>

                  <div className="container d-flex ps-5">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={`checkPublish${tip.idPost}`}
                        id={`checkPublish${tip.idPost}`}
                        checked={tip.published}
                        onChange={(event) => handlePublish(tip.idPost, event)}
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor={`checkPublish${tip.idPost}`}
                      >
                        Publicado
                      </label>
                    </div>
                  </div>
                  <div className="container d-flex ps-5">
                    <div className="form-check ">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={`flexCheckChecked${tip.idPost}`}
                        id={`flexCheckChecked${tip.idPost}`}
                        checked={tip.viewFavPost}
                        onChange={(event) =>
                          handleFavorite(tip.idPost, event, tip.published)
                        }
                      ></input>
                      <label
                        className="form-check-label"
                        htmlFor={`flexCheckChecked${tip.idPost}`}
                      >
                        Favorito
                      </label>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>
        <div className="container my-3" style={{ display: "none" }}>
          {/*aquí abajo va el paginado */}
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className="page-item disabled">
                <a className="page-link">Previous</a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  1
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  2
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  3
                </a>
              </li>
              <li className="page-item">
                <a className="page-link" href="#">
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
        {modal ? (
          <Modal
            onClose={handleOnClose}
            tip={tipModal}
            allCategories={allCategoryTips}
          />
        ) : null}
      </div>
      <div>
        {modalCategories ? (
          <EditCategories
            onClose={handleOnClose}
            allCategories={allCategoryTips}
          />
        ) : null}
      </div>
      <div>
        {newTipModal ? (
          <NewTips onClose={handleOnClose} allCategories={allCategoryTips} />
        ) : null}
      </div>
    </div>
  );
}

export default TipsEdit;
