import {Router} from 'express'
import {createCarHand, getCarHand, getCarByIdHand, updateCarHand, updDomCarHand,delCarHand } from '../Handlers/carHandlers/index.js'
import { verifyToken, checkRole } from '../Utils/validation/index.js'

const carRouter=Router();

carRouter.get('/car',  verifyToken, getCarHand);
carRouter.get('/car/:id', verifyToken, getCarByIdHand);
carRouter.post('/car', verifyToken, checkRole([0,2]), createCarHand);
carRouter.put('/car/:id', verifyToken, checkRole([0,2]), updateCarHand);
carRouter.patch('/car/:id',   verifyToken, checkRole([0]),updDomCarHand);
carRouter.delete('/car/:id', verifyToken, checkRole([0,2]), delCarHand);

export default carRouter;