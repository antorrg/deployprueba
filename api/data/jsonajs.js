import { writeFile, readFile } from 'fs/promises';

async function transformarJSONyGuardar(nombreArchivoJSON, nombreArchivoJS) {
    try {
        const data = await readFile(nombreArchivoJSON, 'utf8');
        const jsonArray = JSON.parse(data);

        const objetoJS = jsonArray.map(item => {
            const newObj = {};
            for (let key in item) {
                newObj[item[key]] = item[key];
            }
            return newObj;
        });

        const contenidoJS = `const objetoJS = ${JSON.stringify(objetoJS, null, 4)};\n\nexport default objetoJS;`;

        await writeFile(nombreArchivoJS, contenidoJS);
        console.log(`El archivo ${nombreArchivoJS} ha sido guardado correctamente.`);
    } catch (err) {
        console.error('Error al transformar o guardar el archivo:', err);
    }
}

const nombreArchivoJSON = './users.json';
const nombreArchivoJS = 'objetoJS.mjs';

transformarJSONyGuardar(nombreArchivoJSON, nombreArchivoJS);
