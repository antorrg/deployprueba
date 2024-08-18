import {Router}from 'express';
import us from '../Handlers/userControllers.js'
import m from '../Utils/middleIds.js';
import * as midd from '../Utils/validation/index.js';
import { verifyDoNotDel, notComparePassword} from '../Utils/validation/validateUsers.js'
import {verifyUsAttributes} from '../Utils/SUcreate-protect/index.js'
const userRouter = Router();

userRouter.get('/user', midd.verifyToken, midd.checkRole([0,2]), us.getUserHand)
userRouter.get('/user/:id', midd.verifyToken, m.middUuid, us.getDetailUserHand)
userRouter.post('/user/login',midd.middleLogin, us.userLogHand)
userRouter.post('/user/create', midd.verifyToken, midd.checkRole([0,2]), midd.middleCreate, us.userCreateHand)
userRouter.post('/user',  midd.verifyToken, midd.checkRole([0,1,2]),   midd.middleCompare, notComparePassword, us.userPassHand)
userRouter.put('/user/:id',   midd.verifyToken, verifyUsAttributes,  midd.checkRole([0,1,2]), m.middUuid,us.updateUserHand)
userRouter.patch('/user/:id',  verifyDoNotDel, midd.verifyToken, midd.checkRole([0]), m.middUuid, us.resetUserhand)
userRouter.delete('/user/:id',  verifyDoNotDel, midd.verifyToken, midd.checkRole([0]), m.middUuid, us.delUserHand)


export default userRouter;