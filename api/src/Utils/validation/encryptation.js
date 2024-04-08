import pkg from 'jsonwebtoken';
const {sign, verify} = pkg;
// import {sign, verify} from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const {SECRET_KEY}=process.env;

const generateToken = (user)=>{
    const secretKey = SECRET_KEY;
    const token = sign({userId: user.id, email:user.email, role:user.role}, secretKey,{expiresIn: '5h'});
    return token;
}

const verifyToken =(req, res, next)=>{
    const token = req.headers['x-access-token']||req.headers.authorization;
    if(!token){return res.status(401).json({error: 'Access denied. Missing token'})};
    verify(token, SECRET_KEY, (err, decoded)=>{
        if(err){
            if(err.name === 'TokenExpiredError'){
                return res.status(401).json({error: 'Token Expired'});
            }
            return res.status(401).json({error:'Invalid Token'});
        }
        req.user= decoded;
        const userId= decoded.id;
        const userRole = decoded.role;
        req.userInfo={userId, userRole};
        //console.log(req.userInfo +' userInfo')
        next();
    })
}


export {
    generateToken,
    verifyToken
};
  


