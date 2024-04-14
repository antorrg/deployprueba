import style from '../styles/Modal.module.css'
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import  ValidServCreate  from '../ServValidate';
import postService from '../SendServicePosts';
import GenericButton from '../../../../GenericButton/GenericButton';
import showConfirmationDialog from '../../../../utils/sweetAlert';


const CreateService = ({closServ}) => {
    const CarId = sessionStorage.getItem('CarId')


  const [input, setInput] = useState({
    type: "",
    detail: "",
    date_in: "",
    date_out:"",
    observations: "",
    CarId:CarId,
    });

  const [error, setError] = useState({
        type:"",
        detail: "",
        date_in: "",
        date_out: "",
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
      [name]: ValidServCreate({ ...input, [name]: value })[name],
    });
  };

  const handleSubmit =  async (event) => {
    event.preventDefault();
    const confirmed = await showConfirmationDialog('¿Está seguro de crear el servicio?');
    if (confirmed) {
      handleConfirmation()
    }
  };

  const handleConfirmation = async (e) => {
    const validationErrors = ValidServCreate(input);
    setError(validationErrors);

    if (Object.values(validationErrors).every((error) => error === "")) {
      await  postService(input, closServ);
      setInput({
        type: "",
        detail: "",
        date_in: "",
        date_out: "",
        observations: "",
        CarId:CarId,
      });
      navigate("/admin");
    }
    
  };
  

  const permit =
  !input.detail.trim() ||
  !input.date_in.trim() ||
  !input.observations.trim() ||
  error.type ||
  error.detail ||
  error.date_in ||
  error.date_out ||
  error.observations;

  return (
    <div>
      <form onSubmit={handleSubmit}>
       <div>
        <h3>Crear Servicio: </h3>
         </div>   
         <div >
          <select name="type" onChange={(event) => handleChange(event)}>
          <option  value="" > Elija un servicio...</option>
            <option value={'Service'}>Service</option>
            <option value={'Reparacion'}>Reparacion</option>
            <option value={'Presupuesto'}>Presupuesto</option>
          </select>
           <label > Tipo: </label>
           {error.type && <p className={style.errorMessage}>{error.type}</p>}
         </div>
         <br/>
         <div >
           <input
             type="text"
             placeholder="Detalle"
             value={input.detail}
             name="detail"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Detalle: </label>
           {error.detail && <p className={style.errorMessage}>{error.detail}</p>}
         </div>
         <br/>
         <div >
           <input
             type="date"
             placeholder="AAAA-MM-DD"
             value={input.date_in}
             name="date_in"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Fecha entrada: </label>
           {error.date_in && <p className={style.errorMessage}>{error.date_in}</p>}
         </div>
    <br/>
    <div >
           <input
             type="date"
             placeholder="Fecha salida"
             value={input.date_out}
             name="date_out"
             autoComplete="off"
             onChange={(event) => handleChange(event)}
             className=''
           />
           <label > Fecha salida: </label>
           {error.date_out && <p className={style.errorMessage}>{error.date_out}</p>}
         </div>
         <br/>
         <div >
           <input
             type="textarea"
             placeholder="Observaciones"
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
         <br/>
    <GenericButton type='submit' buttonText={'Crear Servicio'} disabled={permit}/>
      </form>
    </div>
  );
};

export default CreateService