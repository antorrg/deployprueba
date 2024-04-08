import style from './styles/LoginForm.module.css'
import { useState, useEffect } from "react";
import GenericButton from '../GenericButton/GenericButton';
import { useNavigate } from "react-router-dom";
import {ValidLogin} from './internalUtils/Validate';
import {loginUser}from './Auth'


const LoginForm = ({handleSignClick, auth}) => {
  
  const {login, authenticated, user}=auth;
  const navigate = useNavigate();
  //----------------------------------------
  const [showForm, setShowForm] = useState(false);
  const [showPassword, setShowPassword]= useState(false)

  useEffect(() => {
    if (!authenticated) {
      setShowForm(true);
    } else {
      handleSignClick();
    }
  }, [authenticated, handleSignClick]);

  //-------------------------------------------------

  const onClose= ()=>{
    navigate("/")
  }
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setInput({
      ...input,
      [name]: value,
    });
    setError({
      ...error,
      [name]: ValidLogin({ ...input, [name]: value })[name],
    });
  }
  
  const handleSubmit = async(event)=>{
    event.preventDefault();
    
    const user = await loginUser(input,login);
    setInput({
      email: "",
      password: "",
    });
    if(user){
      navigate("/home");
      
    }
    //}
  }
  const permit= (!input.email.trim() ||!input.password.trim() ||error.email|| error.password)? true :null;
 
  
  return (
    <div className={style.form}>
        <div>
        <GenericButton onClick={onClose} buttonText={'Cancelar'}/>
        </div>
        {showForm && (
      <form onSubmit={(event) => handleSubmit(event)}>
        <br/>
        <div >
          <label > Email: </label>
          <input
            type="text"
            placeholder="email"
            value={input.email}
            name="email"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className=''
            />
          {error.email && <p className={style.errorMessage}>{error.email}</p>}
        </div>
        <br/>
        <div>
          <label > Password: </label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="password"
            value={input.password}
            name="password"
            autoComplete="off"
            onChange={(event) => handleChange(event)}
            className=''
          />
          <button type= 'button' onClick={()=>{setShowPassword(!showPassword)}}>
          <i className={showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'}></i>
          </button>
          {error.password && <p className={style.errorMessage}>{error.password}</p>}
        </div>
        <br/>
        <GenericButton type='submit' buttonText={'Iniciar Sesion'} disabled={permit}/> {/*en lugar de null va permit*/}
      </form>
        )}
     
    </div>
  );
};

export default LoginForm


