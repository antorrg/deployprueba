import {Router}from 'express';
import usLog from '../Handlers/userHandler/userLogHandler.js'
import usH from '../Handlers/userHandler/userHandlers.js'
import m from '../Utils/middleIds.js';
import { middleCreate, middleLogin,  middleCompare} from '../Utils/validation/index.js';
import { verifyToken, checkRole } from '../Utils/validation/index.js';
import { verifyDoNotDel, notComparePassword} from '../Utils/validation/validateUsers.js'
import {verifyUsAttributes} from '../Utils/SUcreate-protect/index.js'
const userRouter = Router();

userRouter.get('/user', verifyToken, checkRole([0,2]), usH.getUserHand)
userRouter.get('/user/:id', verifyToken, m.middUuid, usH.getDetailUserHand)
userRouter.post('/user/login', middleLogin, usLog.userLogHand)
userRouter.post('/user/create', verifyToken, checkRole([0,2]), middleCreate, usLog.userCreateHand)
userRouter.post('/user',  verifyToken, checkRole([0,1,2]),   middleCompare, notComparePassword, usLog.userPassHand)
userRouter.put('/user/:id',   verifyToken, verifyUsAttributes,  checkRole([0,1,2]), m.middUuid,usH.updateUserHand)
userRouter.patch('/user/:id',  verifyDoNotDel, verifyToken, checkRole([0]), m.middUuid, usH.resetUserhand)
userRouter.delete('/user/:id',  verifyDoNotDel, verifyToken, checkRole([0]), m.middUuid, usH.delUserHand)


export default userRouter;