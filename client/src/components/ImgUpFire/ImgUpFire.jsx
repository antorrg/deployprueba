import React, { useState, useEffect } from 'react';
 import {app} from '../../firebase/firebaseConfig';
  import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

  
const ImgUpFire = ({ maxImages, uploadImgs }) => {
 
  const [imagenes, setImagenes] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imagenUrls, setImagenUrls] = useState([]);
 
  const handleFile = (e) => {
    const files = e.target.files;
    if (imagenes.length + files.length <= maxImages) {
      const newImagenes = [...imagenes, ...files];
      setImagenes(newImagenes);
    } else {
      alert(`Solo se permiten un máximo de ${maxImages} imágenes.`);
    }
  };

  const handleDeleteImage = (index) => {
    const newImagenes = [...imagenes];
    newImagenes.splice(index, 1);
    setImagenes(newImagenes);
  };
  const handleUpload = async () => {
    const storage = getStorage(app);
    setUploadProgress(0);
  
    try {
      const uploadedUrls = [];
      await Promise.all(imagenes.map(async (imagen) => {
        const storageRef = ref(storage, `images/${imagen.name}`);
        await uploadBytes(storageRef, imagen);
        const url = await getDownloadURL(storageRef);
        uploadedUrls.push(url);
      }));
      uploadImgs(uploadedUrls[0])
      //console.log('Imagenes para subir:', uploadImgs);
      setUploadProgress(100);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        <input type='file' id='file' placeholder="Seleccione una imagen" accept="image/*" multiple onChange={handleFile} />
        <label htmlFor="file">Imagen</label>
      </section>
      {imagenes.map((imagen, index) => (
        <div key={index}>
          <img src={URL.createObjectURL(imagen)} alt="Imagen subida" style={{maxWidth:'150px'}}/>
          <button onClick={() => handleDeleteImage(index)}>Eliminar</button>
        </div>
      ))}
      {uploadProgress > 0 && (
        <p>Progreso de la subida: {uploadProgress}% Imagen archivada</p>
      )}
      <button onClick={handleUpload} >Subir</button>
    </div>
  );
};

ImgUpFire.defaultProps = {
  maxImages: 1 // Por defecto, se permite solo una imagen
};

export default ImgUpFire;
