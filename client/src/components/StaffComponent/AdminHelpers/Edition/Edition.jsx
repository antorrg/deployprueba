import React, { useState, useEffect } from 'react';
import GenericButton from '../../../GenericButton/GenericButton';
import { useAuth } from './../../../Auth/AuthContext/AuthContext';

const Edition = ({ allowedRoles = (allowedRoles), exception, text, onClick }) => {
  const { user } = useAuth();
  const permit = user ? user.role : null;
  
  // Estado para indicar si la verificación de la excepción está en curso
  const [exceptionLoading, setExceptionLoading] = useState(true);

  useEffect(() => {
    // Simular una demora para la verificación de la excepción (por ejemplo, 1 segundo)
    const timeout = setTimeout(() => {
      setExceptionLoading(false);
    }, 50);
    // Limpiar el temporizador al desmontar el componente
    return () => clearTimeout(timeout);
  }, []);
 

  
  // Verificamos si el rol actual está en los roles permitidos
 //isEvalued fue hecha para forzar casos numericos a boolean
  const isEvalued =(case1, case2)=>{
     let result; 
     if(case2.includes(case1)){result = true}
     else{ result=false}
     return result;
   }
   const isPermitted =isEvalued(permit, allowedRoles);
  // Mostramos el botón solo si hay permiso o la verificación de la excepción ha terminado
  return (
    <>
      {!exceptionLoading && (isPermitted||exception) && (
        <GenericButton buttonText={text} onClick={onClick} />
      )}
    </>
  );
};

export default Edition;



//alowedRoles={(0, 2)}