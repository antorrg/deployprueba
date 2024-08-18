import { catchError } from '../Utils/errors/errorsHandlers.js'
import us from '../Controllers/userServices.js'

export default {

    userCreateHand : catchError(async (req, res)=>{
        const {email, name, typeId, numberId, country}=req.body;
           const response = await us.userCreate(email, name, typeId, numberId, country)
           res.status(201).json(response) 
    }),

    userLogHand : catchError( async (req, res)=>{
        const {email, password}=req.body;
           const response = await us.userLogin(email, password)
           res.status(200).json(response) 
    }),
    
    getUserHand : catchError( async (req, res)=>{
        const {numberId}=req.query;
            if(numberId){
                const response = await us.userByQuery(numberId)
                res.status(200).json(response)   
            }else{
                const response = await us.getUsers()
                res.status(200).json(response) 
            }
    }),
    
    
     getDetailUserHand : catchError(async (req, res)=>{
        const {id} = req.params;
           const response = await us.userById(id)
           res.status(200).json(response) 
    }),
    
    userPassHand : catchError(async (req, res)=>{
        const {id, password}= req.body;
            const response = await us.compare(id, password);
            res.status(200).json(response);
    }),

    updateUserHand : catchError(async (req, res)=>{
        const {id} = req.params;
        const newData = req.body;
           const response = await us.updateUser(id, newData)
           res.status(200).json(response) 
    }),

    resetUserhand : catchError(async(req,res)=>{
        const {id}= req.params;
          const response = await us.resetPassword(id)
          res.status(200).json(response) 
    }),

    delUserHand : catchError(async (req, res)=>{
        const {id} = req.params;
          const response = await us.deleteUser(id)
          res.status(200).json(response) 
    }),

};