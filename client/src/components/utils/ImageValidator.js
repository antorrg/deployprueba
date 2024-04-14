// ImageValidator.js valida si la imagen que se pasa como argumento (file) cumple con los requisitos de tamaños y pesos.
//?Recibe el peso en kBytes y las medidas en px.
//file se pasa desde el componente como, por ejemplo, const file = e.target.files[0];
//En el componente, si la promesa de validateImage se resuelve, la ejecución continua, de lo contrario pasa al bloque catch. Debe manejarse como:
/*
try {
      const file = e.target.files[0]; (por ejemplo)
      await validateImage(file, ...);
        código y mensaje de éxito
      } catch (error) {
        mensaje de error
      }
*/

const validateImage = async (
  file,
  minWidth,
  maxWidth,
  minHeight,
  maxHeight,
  minSizeInKBytes,
  maxSizeInKBytes
) => {
  return new Promise((resolve, reject) => {
    try {
      // Verificar si se seleccionó un archivo
      if (!file) {
        reject("No se seleccionó ningún archivo.");
        return;
      }

      // Crear una instancia de FileReader
      const reader = new FileReader();

      // Asignar una función para ejecutar cuando se haya leído el archivo
      reader.onload = function (event) {
        // Crear una instancia de Image
        const img = new Image();

        // Asignar una función para ejecutar cuando la imagen se haya cargado
        img.onload = function () {
          // Obtener las dimensiones de la imagen
          const width = this.width;
          const height = this.height;

          // Verificar si las dimensiones cumplen con los requisitos
          if (
            width > maxWidth ||
            width < minWidth ||
            height > maxHeight ||
            height < minHeight
          ) {
            reject(
              `Las dimensiones de la imagen deben estar entre ${minWidth} y ${maxWidth}px de ancho, y entre ${minHeight} y ${maxHeight}px de alto.`
            );
            return;
          }

          // Verificar el tamaño del archivo
          const fileSizeKB = file.size / 1024;
          if (fileSizeKB > maxSizeInKBytes || fileSizeKB < minSizeInKBytes) {
            reject(
              `El tamaño del archivo debe estar entre ${minSizeInKBytes} y ${maxSizeInKBytes} KB. Tamaño del seleccionado ${fileSizeKB}`
            );
            return;
          }

          // La imagen pasó todas las validaciones
          resolve();
        };

        // Asignar la URL de la imagen al src del objeto Image
        img.src = event.target.result;
      };

      // Leer el archivo como una URL de datos
      reader.readAsDataURL(file);
    } catch (error) {
      reject("Error al validar la imagen.");
    }
  });
};

export default validateImage;
