import React, { useState, useEffect } from "react";
import { imagesDB } from "../../firebase/firebaseConfig";
import {
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import DivImageCustom from "./DivImageCustom";
import Swal from "sweetalert2";
import validateImage from "../utils/ImageValidator";
import TitleSegment from "./TitleSegment";

function ImageLanding() {
  const [images, setImages] = useState(Array(3).fill(null));
  const [refItems, setRefItems] = useState([]);
  //configuramos las medidas en px y tamaño en kB min y max aceptados para las imágenes
  const minWidthAccepted = 600;
  const maxWidthAccepted = 1920;
  const minHeightAccepted = 500;
  const maxHeigthAccepted = 1080;
  const minSizeKBaccepted = 76;
  const maxSizeKBaccepted = 1000;

  //creo una referencia a la carpeta /principal en Firebase Storage y me traigo las imágenes que hay allí. Guardo la referencia en refItems por si luego deseo eliminar alguna imagen.
  //Creo un array images con 3 elementos, haya o no imágenes en Storage. Si no hay imgs el elemento es null
  const fetchImages = async () => {
    try {
      const storageRef = ref(imagesDB, "principal");
      const { items } = await listAll(storageRef);
      setRefItems(items);
      const downloadUrls = await Promise.all(
        items.slice(0, 3).map((item) => getDownloadURL(item))
      );
      const filledImages = downloadUrls.concat(
        Array(3 - downloadUrls.length).fill(null)
      );
      setImages(filledImages);
    } catch (error) {
      console.error("Error al cargar imágenes:", error);
      // Si hay un error al cargar las imágenes, llenar el estado con valores nulos
      setImages(Array(3).fill(null));
      //mostrar mensaje al usuario
      Swal.fire({
        title: "Hubo un error?",
        text: "Recarga la página por favor.",
        icon: "question",
      });
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleImageClick = (index) => {
    document.getElementById(`fileInput${index}`).click();
  };

  const handleDeleteImage = (refItem) => {
    //comprobar que siempre quede al menos una img para mostrar
    if (refItems.length <= 1) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debe haber al menos una imagen. No puedes eliminarlas a todas",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
      return;
    }

    const delImg = () => {
      // Create a reference to the file to delete
      const deleteRef = ref(imagesDB, refItem._location.path);
      // Delete the file
      deleteObject(deleteRef)
        .then(() => {
          // File deleted successfully
          Swal.fire({
            title: "Eliminada!",
            text: "La imagen ha sido eliminada.",
            icon: "success",
          });
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          console.error("Error al eliminar: ImageLanding.jsx");
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al borrar la imagen, intenta de vuelta.",
            //footer: '<a href="#">Why do I have this issue?</a>',
          });
        });
    };
    //Seguro deseas eliminar?
    Swal.fire({
      title: "Seguro?",
      text: "Vas a eliminar la imagen",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminarla!",
    }).then((result) => {
      if (result.isConfirmed) {
        delImg();
        fetchImages();
      }
    });
  };

  const handleFileChange = async (index, e) => {
    try {
      const file = e.target.files[0];

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

      //comprobar si existe ya una imagen con el mismo nombre en la BD
      const existImg = refItems.some((ref) => ref.name === file.name);
      if (existImg) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ya existe una imagen con el mismo nombre.",
        });
        return;
      }

      const storageRef = ref(imagesDB);
      const fileRef = ref(storageRef, `principal/${file.name}`);
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      const newImages = [...images];
      newImages[index] = url;
      setImages(newImages);

      const newRefs = [...refItems];
      newRefs[index] = fileRef;
      setRefItems(newRefs);
    } catch (error) {
      console.error(
        "Error al subir archivo: componente ImageLanding.jsx " + error
      );
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de vuelta.",
        //footer: '<a href="#">Why do I have this issue?</a>',
      });
    }
  };

  //Datos para mostrar en el encabezado de la sub sección
  const title = "Imagen principal";
  const detail = `Selecciona de una y tres imágenes que se mostrarán como principales en
          tu App. Aleatoriamente se mostrará una de ellas. Escoge un
          formato .jpg, .jpeg, .png, con orientación apaisada.
          Dimension y peso aceptado:
          Ancho: ${minWidthAccepted} a ${maxWidthAccepted} px.
          Alto: ${minHeightAccepted} a ${maxHeigthAccepted} px. 
          Peso: ${minSizeKBaccepted} a ${maxSizeKBaccepted} KB`;

  return (
    <div className="container align-items-center justify-content-center">
      <TitleSegment title={title} detail={detail} />
      <div
        className="container row"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columnas con el mismo ancho
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        {images.map((image, index) => (
          <DivImageCustom
            key={index}
            image={image}
            index={index}
            refItem={refItems[index]}
            handleImageClick={handleImageClick}
            handleFileChange={handleFileChange}
            handleDeleteImage={handleDeleteImage}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageLanding;
