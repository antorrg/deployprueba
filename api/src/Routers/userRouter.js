import {Router}from 'express';
import {userLogHand, userCreateHand, userPassHand,}from '../Handlers/userHandler/userLogHandler.js'
import {getUserHand, getDetailUserHand, updateUserHand, resetUserhand, delUserHand}from '../Handlers/userHandler/userHandlers.js'
import { middleCreate, middleLogin,  middleCompare} from '../Utils/validation/index.js';
import { verifyToken, checkRole } from '../Utils/validation/index.js';
import {verifyUsPas, verifyDoNotDel, notComparePassword} from '../Utils/validation/validateUsers.js'

const userRouter = Router();

userRouter.get('/user', verifyToken, checkRole([0,2]), getUserHand)
userRouter.get('/user/:id', verifyToken, getDetailUserHand)
userRouter.post('/user/login', middleLogin, userLogHand)
userRouter.post('/user/create', verifyToken, checkRole([0,2]), middleCreate, userCreateHand)
userRouter.post('/user',  verifyToken, checkRole([0,1,2]),   middleCompare, notComparePassword, userPassHand)
userRouter.put('/user/:id',  verifyToken,verifyUsPas,  checkRole([0,1,2]), updateUserHand)
userRouter.patch('/user/:id', verifyDoNotDel, verifyToken, checkRole([0]), resetUserhand)
userRouter.delete('/user/:id', verifyDoNotDel, verifyToken, checkRole([0,1]), delUserHand)


export default userRouter;