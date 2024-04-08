import React, { useState, useEffect } from "react";
import { imagesDB } from "../../firebase/firebaseConfig";
import { ref, listAll, getDownloadURL, uploadBytes } from "firebase/storage";
import DivCustom from "./DivCustom";

function ImageLanding() {
  const [images, setImages] = useState(Array(3).fill(null));

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const storageRef = ref(imagesDB, "principal");
        const { items } = await listAll(storageRef);
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
      }
    };

    fetchImages();
  }, []);

  const handleImageClick = (index) => {
    document.getElementById(`fileInput${index}`).click();
  };

  const handleFileChange = async (index, e) => {
    try {
      const file = e.target.files[0];
      // Verificar si se selecciona un archivo
      if (!file) {
        alert("No se seleccionó ningún archivo.");
        console.error("No se seleccionó ningún archivo.");
        return;
      }

      // Verificar si la extensión del archivo es válida
      const validExtensions = ["jpg", "jpeg", "png"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !validExtensions.includes(extension) ||
        file.type.indexOf("image/") !== 0
      ) {
        console.error(
          "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg y png."
        );
        alert(
          "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg y png."
        );
        return;
      }

      const storageRef = ref(imagesDB);
      const fileRef = ref(storageRef, `principal/${file.name}`);
      await uploadBytes(fileRef, file);
      console.log(file);
      const url = await getDownloadURL(fileRef);
      console.log(url);
      const newImages = [...images];
      newImages[index] = url;
      setImages(newImages);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  return (
    <div className="container align-items-center justify-content-center">
      <div>
        <h4>Imágenes principales</h4>
      </div>
      <div className=" container w-75">
        <p>
          Selecciona entre una y tres imágenes que se mostrarán como principales
          en tu App. Aleatoriamente se mostrará una de ellas. Escoge un formato
          .jpg, .jpeg, .png, con orientación apaisada.
        </p>
      </div>
      <div
        className="container row"
        style={{
          gridTemplateColumns: "repeat(3, 1fr)", // 3 columnas con el mismo ancho
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {images.map((image, index) => (
          <DivCustom
            key={index}
            image={image}
            index={index}
            handleImageClick={handleImageClick}
            handleFileChange={handleFileChange}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageLanding;
