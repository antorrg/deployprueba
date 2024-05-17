// Esta funcion fue creada para comprobar si existen los campos s
//que estaran asociados al objeto creado.
//Fue hecha de modo que pueda utilizarse más de una vez
//*Recibe como parametros el nombre de la Tabla (DB) y el id recibido por body.
const findFields = async (table, field) => {
    
   try {
    const tableName = table.tableName;
    const fieldsNotFound = [];
    const fieldsFound = [];

    //Buscar cada equipo por su ID en la base de datos
    for (const fieldId of field) {
        const item = await table.findByPk(fieldId);
        if (!item) {
            fieldsNotFound.push(fieldId);
        } else {
            fieldsFound.push(fieldId);
        }
    }
    // Verificar si alguno de los generos no fue encontrado
    if (fieldsNotFound.length > 0) {
        throw new Error(`${tableName} not found: ${fieldsNotFound.join(', ')}`);
    }
    return fieldsFound;
   } catch (error) {
    throw error;
   }
}

export default findFields

