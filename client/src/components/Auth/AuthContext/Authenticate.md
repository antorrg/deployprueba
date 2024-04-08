# Autenticacion con useContext

El hook useContext de React puede ser muy útil para manejar el estado global de autenticación en tu aplicación. Puedes crear un contexto que almacene información de autenticación, como el token y los detalles del usuario, y luego acceder a este contexto en cualquier componente que lo necesite utilizando useContext.

Aquí hay un ejemplo básico de cómo podrías implementar esto:

### Crear el contexto:
``` javascript
// AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setAuthenticated(true);
    setUser(userData);
    // Aquí podrías almacenar el token en localStorage, cookies, etc.
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    // Aquí podrías limpiar el token almacenado.
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
```
### Usar el Contexto en tu Aplicación:
```javascript
/import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import store from './Redux/store'
import { AuthProvider} from './Auth/AuthContext/AuthContext';



const root = ReactDOM.createRoot(document.getElementById('root')); 
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App/>
    </AuthProvider>

  </React.StrictMode>
);

```
### Acceder al Contexto en Componentes:

```javascript
// MainComponent.js
import React from 'react';
import { useAuth } from './AuthContext';

const MainComponent = () => {
  const { authenticated, user, login, logout } = useAuth();

  // Ahora puedes usar `authenticated`, `user`, `login`, y `logout` en este componente.
  // Por ejemplo, podrías mostrar diferentes contenido según si el usuario está autenticado o no.

  return (
    <div>
      {authenticated ? (
        <p>Bienvenido, {user.username}!</p>
      ) : (
        <button onClick={() => login('dummyToken', { username: 'Usuario' })}>
          Iniciar Sesión
        </button>
      )}
    </div>
  );
};

export default MainComponent;
```
Al usar useContext de esta manera, puedes acceder fácilmente a la información de autenticación desde cualquier componente sin tener que pasarla a través de múltiples niveles de propiedades. Esto facilita el manejo del estado global de autenticación en tu aplicación React.

> PD: Luego de mi pregunta de como ingresaria la info al AuthProvider Chatgpt me respondió:
Para tomar la información de la respuesta del servidor después de un inicio de sesión exitoso y proporcionarla al AuthProvider, puedes hacer lo siguiente:

### Modificar la función login del AuthProvider:
```javascript
// AuthContext.js

// ... (resto del código)

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = (token, userData) => {
    setAuthenticated(true);
    setUser(userData);

    // Aquí podrías almacenar el token en localStorage, cookies, etc.
    // Ejemplo de almacenamiento en localStorage:
    localStorage.setItem('token', token);
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);

    // Aquí podrías limpiar el token almacenado.
    // Ejemplo de limpieza en localStorage:
    localStorage.removeItem('token');
  };

  // Al cargar la aplicación, verifica si hay un token almacenado en localStorage.
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      // Si hay un token almacenado, establece el estado de autenticación.
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ... (resto del código)
```

### Después de un inicio de sesión exitoso:
```javascript
// Componente donde manejas el inicio de sesión
import { useAuth } from './AuthContext';

const Login = () => {
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      // Hacer la solicitud al servidor para iniciar sesión.
      const response = await api.post('/login', { username, password });

      // Extraer el token y los datos del usuario desde la respuesta.
      const { token, user } = response.data;

      // Llamar a la función login del AuthProvider para actualizar el estado de autenticación.
      login(token, user);

      // Redirigir o realizar otras acciones después del inicio de sesión exitoso.
    } catch (error) {
      // Manejar errores de inicio de sesión.
    }
  };

  return (
    <div>
      {/* Formulario de inicio de sesión y botón de inicio de sesión */}
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};
```
Este ejemplo asume que la respuesta del servidor después del inicio de sesión exitoso contiene un objeto con propiedades token y user. Puedes ajustar esto según la estructura de tu respuesta de inicio de sesión real.

En este caso, la función login del AuthProvider ahora toma un token y la información del usuario como argumentos, y también almacena el token en localStorage. Además, cuando se carga la aplicación, se verifica si hay un token almacenado en localStorage, y si es así, se establece el estado de autenticación en true.

Recuerda manejar adecuadamente el manejo de errores y la seguridad, especialmente al tratar con tokens de autenticación y datos de usuario.

> No pude usarlo asi porque no puedo utilizar un hook de react en el contexto de una funcion asincrona, la manera que encontré fue esta: 

En mi app el componente de alto nivel que puedo utilizar es Form, este renderiza de forma condicional a LoginForm y SignInForm, para loguin y creación de usuario respectivamente, luego estos componentes invocan a las funciones LoginUser y CreateUser del componente Auth que son las que se encargan de los metodos post, por tanto son las que deben recibir la response con el token y el usuario. 

Por lo tanto, en mi componente Form:
```javascript
import style from '../components/styles/ModalEdit.module.css'
import {useState, useEffect}from 'react'
import { useDispatch } from 'react-redux';
import {getAllUsers}from '../Redux/actions'
import {LoginForm,SignWindow} from '../Auth/AuthIndex';
import {useAuth}from '../Auth/AuthContext/AuthContext'


const Form = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
 useEffect(()=>{
   dispatch(getAllUsers())
 },[])

  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSignClick = () => {
    setIsModalOpen(true);
  };

  const handleSignWindowClose = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <LoginForm handleSignClick= {handleSignClick} auth={auth} />
      <div>
      {isModalOpen && <SignWindow onClose={handleSignWindowClose} auth ={auth}/>}
      </div>
     
    </div>
  )
}
export default Form;
```