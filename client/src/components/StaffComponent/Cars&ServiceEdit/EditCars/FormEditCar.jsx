import { useState } from 'react';
import style from '../../generalStyles/ModalsForms/Forms.module.css';
import GenericButton from '../../../GenericButton/GenericButton';
import showConfirmationDialog from '../../../utils/sweetAlert'
import ImgUpFire from '../../../ImgUpFire/ImgUpFire';





const FormEditCar = ({ editedCar, onInputChange, onSaveChanges }) => {
  const [imageUrl, setImageUrl] = useState(editedCar.picture);
  
   
  
   const onImageChange = (url) => {
     setImageUrl(url);
     //console.log(setImageUrl)
     onInputChange("picture", url);
   };
   

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    onInputChange(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmed = await showConfirmationDialog('¿Está seguro de actualizar el vehiculo?');
    if (confirmed) {
        // Si el usuario hace clic en "Aceptar", ejecutar la funcion:
        onSaveChanges() 
    }
   
  };

  return (
    <div className={style.formContainer}>
       <h3 >Editar Vehiculo</h3>
        <label>
          {imageUrl && <img style={{maxWidth:'120px'}} src={imageUrl} alt="Current Car" />}
        </label>
        <ImgUpFire maxImages={1} uploadImgs={onImageChange}/>
    <form onSubmit={handleSubmit}>
     <div>
       </div>   
       <div >
         <input
           type="text"
           placeholder="patente"
           value={editedCar.patent}
           name="patent"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Patente: </label>
       </div>
       <br/>
       <div >
         <input
           type="text"
           placeholder="marca"
           value={editedCar.mark}
           name="mark"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Marca: </label>
       </div>
       <br/>
       <div >
         <input
           type="text"
           placeholder="modelo"
           value={editedCar.model}
           name="model"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Modelo: </label>
       </div>
  <br/>
  <div >
         <input
           type="text"
           placeholder="año"
           value={editedCar.year}
           name="year"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Año: </label>
       </div>
       <br/>
       <div >
         <input
           type="text"
           placeholder="motorNum"
           value={editedCar.motorNum}
           name="motorNum"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Numero de Motor: </label>
       </div>
       <br/>
       <div >
         <input
           type="text"
           placeholder="chassisNum"
           value={editedCar.chassisNum}
           name="chassisNum"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Numero de chasis: </label>
  
       </div>
       <br/>
       <div >
         <textarea
           type="text"
           placeholder="observaciones"
           value={editedCar.observations}
           name="observations"
           autoComplete="off"
           onChange={handleInputChange}
           className=''
         />
         <label > Observaciones: </label>
     
       </div>
       <br/>
  <GenericButton type='submit' buttonText={'Editar Vehiculo'}/>
    </form>
  </div>
);
};

export default FormEditCar;
