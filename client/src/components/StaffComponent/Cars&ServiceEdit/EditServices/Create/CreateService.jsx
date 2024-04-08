import style from '../styles/Modal.module.css'
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import  ValidCar  from '../CarServValidate';
import { postCar } from '../SendPosts';
import GenericButton from '../../../../GenericButton/GenericButton';
import Confirmation from '../../../../Confirmation/Confirmation';

const CreateCar = () => {
    const idUser= sessionStorage.getItem('idUser')

    const [showConfirmation, setShowConfirmation] = useState(false);
 
  const [input, setInput] = useState({
    patent: "",
    mark: "",
    model: "",
    year: "",
    motorNum: "",
    chassisNum: "",
    observations: "",
    picture: "",
    idUser:idUser,
    });

  const [error, setError] = useState({
        patent: "",
        mark: "",
        model: "",
        year: "",
        motorNum: "",
        chassisNum: "",
        observations: "",
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));

    setError({
      ...error,
      [name]: ValidCar({ ...input, [name]: value })[name],
    });
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    setShowConfirmation(true); 
  };

  const handleConfirmation = async (e) => {
    const validationErrors = ValidCar(input);
    setError(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      await postCar(input);
      setInput({
        patent: "",
        mark: "",
        model: "",
        year: "",
        motorNum: "",
        chassisNum: "",
        observations: "",
        picture: "",
        idUser:idUser,
      });
      navigate("/admin");
    }
    setShowConfirmation(false); 
  };
  const onCancel=()=>{
    setShowConfirmation(false);
  }

  const permit =
  !input.patent.trim() ||
  !input.mark.trim() ||
  !input.model.trim() ||
  !input.year.trim() ||
  !input.motorNum.trim() ||
  !input.chassisNum.trim() ||
  !input.observations.trim() ||
  error.patent ||
  error.mark ||
  error.model ||
  error.year ||
  error.motorNum ||
  error.chassisNum ||
  error.observations;

  return (
    <div>
       {showConfirmation && (
        <Confirmation onConfirm={ handleConfirmation} close={onCancel} message={'¿Está seguro de crear el vehiculo?'} />
      )}
      <form onSubmit={handleSubmit}>
       <div>
         </div>   
         <div >
           <input
             type="text"
             placeholder="patente"
             value={input.patent}
             name="patent"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Patente: </label>
           {error.patent && <p className={style.errorMessage}>{error.patent}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="marca"
             value={input.mark}
             name="mark"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Marca: </label>
           {error.mark && <p className={style.errorMessage}>{error.mark}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="modelo"
             value={input.model}
             name="model"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Modelo: </label>
           {error.model && <p className={style.errorMessage}>{error.model}</p>}
         </div>
    <br/>
    <div >
           <input
             type="text"
             placeholder="año"
             value={input.year}
             name="year"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Año: </label>
           {error.year && <p className={style.errorMessage}>{error.year}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="motorNum"
             value={input.motorNum}
             name="motorNum"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Numero de Motor: </label>
           {error.motorNum && <p className={style.errorMessage}>{error.motorNum}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="chassisNum"
             value={input.chassisNum}
             name="chassisNum"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Numero de chasis: </label>
           {error.chassisNum && <p className={style.errorMessage}>{error.chassisNum}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="observaciones"
             value={input.observations}
             name="observations"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Observaciones: </label>
           {error.observations && <p className={style.errorMessage}>{error.observations}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="imagen"
             value={input.picture}
             name="picture"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Imagen: </label>
         </div>
         <br/>
    <GenericButton type='submit' buttonText={'Crear Vehiculo'} disabled={permit}/>
      </form>
    </div>
  );
};

export default CreateCar