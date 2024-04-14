import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
dotenv.config();
const {SUDO_AUTH } = process.env;
import { getEmails, getUserIdByEmail} from '../SUcreate-protect/index.js'

//! Este es un modulo que contiene solo Middlewares.

//* Funcion validUserCreat: verifica que la info contenga email, password o sub, al mismo tiempo hashea el password.

const validUserCreate = async(req, res, next)=>{
    const { email, password} = req.body;

    if (!email) {
        return res.status(400).json({ error: "missing email" });
    }
    if (!password) {
        return res.status(400).json({ error: "missing password" });
    }
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        req.body.password = hashedPassword;
    }
    


    next();
};
 //* Funcion validUserLog: verifica que la informacion contenga tanto email como password.

const validUserLog = (req, res, next)=>{
    const { email, password } = req.body;
    if (!email) {return res.status(400).json({ error: "missing email" });}
    if (!password) {return res.status(400).json({ error: "missing password" });}
    next ();
};

//* Funcion validUserSu: verifica que se provea un token especifico y lo compara con el provisto por medio de una variable de entorno.

const validUserSu = (req, res, next)=>{
        const providedToken = req.headers['x-access-token'];
        // Verifica si el token está presente
        if (!providedToken) {return res.status(401).json({ error: 'Acceso no autorizado.' });}
        if (providedToken !== SUDO_AUTH) {return res.status(403).json({ error: 'Acceso no autorizado.' });}
        next();
    
};

//* Funcion verifyUsPas: Esta funcion está en una ruta de actualizacion y verifica que si los ids provistos pertenecen a "email1" o "email2" puedan realizar cualquier accion de actualizacion excepto actualizar el password, el email o el rol. Utiliza para ellos las funciones "getEmails" y "getUserIdByEmail".

const verifyUsPas = async (req, res, next) => {
  const {email1, email2}=getEmails();
  try {
    const adminEmails = [email1, email2];
    const id = req.params.id;
    const { email, password, role } = req.body;
    for (const adminEmail of adminEmails) {
      const user = await getUserIdByEmail(adminEmail);
      console.log(user.id)
      if (id === user.id) {
        if (password || role || email) { return res.status(403).json({ error: ' Acción no permitida.' });}
      }
    }
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

const verifyDoNotDel = async (req, res, next) => {
  const {email1, email2}=getEmails();
  const {id }= req.params;
  //console.log('soy id ',id)
  try {
    const adminEmails = [email1, email2];
    for (const adminEmail of adminEmails) {
      const user = await getUserIdByEmail(adminEmail);
      if (id === user.id){return res.status(403).json({ error: ' Acción no permitida.' });}
        return next();
    }
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};
const notComparePassword = async (req, res, next) => {
  const {email1, email2}=getEmails();
  const {id} = req.body;
  try {
    const user1 = await getUserIdByEmail(email1);
    const user2 = await getUserIdByEmail(email2);
    if(id === user1.id || id === user2.id){
      return res.status(403).json({ error: ' Acción no permitida.' })
    }
    return next();
  } catch (error) {
    res.status(500).json({ error: 'Error interno del servidor.' });
  }
};

export { 
    validUserCreate,
    validUserLog,
    validUserSu,
    verifyUsPas,
    verifyDoNotDel,
    notComparePassword
    
}
