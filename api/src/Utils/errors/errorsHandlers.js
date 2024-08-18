

export const catchError = (controller)=>{
    return (req, res, next)=>{
        return controller(req, res, next).catch(next);
    }
};
export const throwError = (message, status, code = null, log = false) =>{
        const error = new Error(message);
        error.status = status;
        if (code) error.code = code;
        if (log) console.error(error); // Ejemplo de logging simple
        throw error;
      }
//Ejemplo extendido con logging:
// function throwError(message, status, code = null, log = false) {
//     const error = new Error(message);
//     error.status = status;
//     if (code) error.code = code;
//     if (log) console.error(error); // Ejemplo de logging simple
//     throw error;
//   }
  
//  // Uso en el servicio
//   try {
//     const data = await someServiceCall();
//     if (!data) throwError('Data not found', 404, 'ERR_DATA_NOT_FOUND', true);
//   } catch (error) {
//     // Manejo del error o propagación
//     throw error;
//   }
  