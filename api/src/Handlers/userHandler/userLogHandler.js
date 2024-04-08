import {userLogin, userCreate}from '../../Controllers/userControllers/userLogin.js'
import compare from '../../Controllers/userControllers/compare.js'

const userLogHand = async (req, res)=>{
    const {email, password}=req.body;
    try {
       const response = await userLogin(email, password)
       res.status(200).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const userCreateHand = async (req, res)=>{
    const {email, name, typeId, numberId, country}=req.body;
    try {
       const response = await userCreate(email, name, typeId, numberId, country)
       res.status(201).json(response) 
    } catch (error) {
        res.status(400).json({error: error.message})
    }
};

const userPassHand = async (req, res)=>{
    const {id, password}= req.body;
    try {
        const response = await compare(id, password);
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}

export {userLogHand, userCreateHand, userPassHand}