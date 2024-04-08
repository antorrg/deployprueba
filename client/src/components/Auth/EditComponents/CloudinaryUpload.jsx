import axios from 'axios'
import { showSuccess, showError } from '../../Auth/HandlerError';

 const uplPreset= import.meta.env.VITE_PRESET
 const cloudName= import.meta.env.VITE_CLOUD_NAME
const CloudinaryUpload = ({ onImageChange }) => {
  
  const handleImageUpload = async (event) => {
    const image = event.currentTarget.files[0];
   
    if (image) {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('upload_preset', uplPreset);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );

        if (response.status === 200) {
          //console.log('Imagen nueva:', response.data.secure_url);
          onImageChange(response.data.secure_url);
          showSuccess("Imagen cargada con éxito");
          return response.data.secure_url
        } else {
          console.error('Error al cargar la imagen');
          showError("No fue posible cargar la imagen");
        }
      } catch (error) {
        console.error('Error al cargar la imagen:', error);
        showError("No fue posible cargar la imagen");
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
    </div>
  );
};

export default CloudinaryUpload;

