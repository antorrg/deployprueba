import  { v4 as uuidv4, validate as uuidValidate } from 'uuid';
// Validaciones para los ids de las peticiones de detalle:

export default {
    middUuid: (req, res, next) => {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ error: 'Missing id' });
        }
        if (!uuidValidate(id)) {
          return res.status(400).json({ error: 'Invalid uuid' });
        }
        next();
      },
    
      middIntId: (req, res, next) => {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ error: 'Missing id' });
        }
        const parsedId = parseInt(id, 10);
        if (isNaN(parsedId) || !Number.isInteger(parsedId) || id.length > 6) {
          return res.status(400).json({ error: 'Invalid integer Id' });
        }
        next();
      } 
   
}