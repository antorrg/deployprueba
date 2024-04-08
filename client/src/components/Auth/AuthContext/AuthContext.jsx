// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const storedToken = localStorage.getItem('validToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setAuthenticated(true);
      // Simula el establecimiento del usuario (puedes adaptarlo según tus necesidades)
      setUser(JSON.parse(storedUser))
    }
     // Este código hace que el useEffect se ejecute también al recargar la página
     //window.location.reload();
     setLoading(false); 
  }, []); 

  const login = (token, userData) => {
    setAuthenticated(true);
    setUser(userData);
    // Aquí podrías almacenar el token en localStorage, cookies, etc.
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('validToken',token)
  
  };

  const logout = () => {
    setAuthenticated(false);
    setUser(null);
    // Aquí podrías limpiar el token almacenado.
    localStorage.clear()

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