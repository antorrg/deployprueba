import {Router} from 'express'
import {createCarHand, getCarHand, getCarByIdHand, updateCarHand, delCarHand } from '../Handlers/carHandlers/carHand.js'
import { verifyToken, checkRole } from '../Utils/validation/index.js'
const carRouter=Router();

carRouter.get('/car', verifyToken, checkRole([0,2]), getCarHand);
carRouter.get('/car/:id', verifyToken, getCarByIdHand);
carRouter.post('/car', verifyToken, checkRole([0,2]), createCarHand);
carRouter.put('/car/:id', verifyToken, checkRole([0,2]), updateCarHand);
carRouter.delete('/car/:id', verifyToken, checkRole([0,2]), delCarHand);

export default carRouter;