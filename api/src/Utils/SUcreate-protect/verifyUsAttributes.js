
import { getEmails, getUserIdByEmail } from './index.js';
import bcrypt from 'bcrypt'

//* Funcion verifyUsAttributes: Esta funcion está en una ruta de actualizacion y 
//* verifica que si los ids provistos pertenecen a "email1" o "email2" puedan 
//*realizar cualquier accion de actualizacion excepto actualizar el password, 
//*el email o el rol. Utiliza para ellos las funciones "getEmails" y "getUserIdByEmail".


const verifyUsAttributes = async (req, res, next) => {
    const {email1, email2}=getEmails();
    console.log('em1', email1)
    console.log('em2', email2)
    const id = req.params.id;
    const { email, password, role } = req.body;
    try {
      const user1 = await getUserIdByEmail(email1);
      const user2 = await getUserIdByEmail(email2);
      if(id === user1.id || id === user2.id){
        const userSel = (user1.id===id)?user1 : user2
        const hashedPass = await bcrypt.compare(password, userSel.password)
        if(!hashedPass){return res.status(403).json({error: 'Accion no permitida'})}
        if(userSel.email !== email ){
          console.log('los emails no son iguales')
          return res.status(403).json({ error: ' Acción no permitida.' })
        }else if(role !== userSel.role){
          console.log('los roles no son iguales')
          return res.status(403).json({ error: ' Acción no permitida.' })
        }
      }
      return next();
    } catch (error) {
      res.status(500).json({ error: 'Error interno del servidor.' });
    }
  };

  export default verifyUsAttributes;