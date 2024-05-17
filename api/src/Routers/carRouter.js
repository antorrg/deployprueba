import {Router} from 'express'
import car from '../Handlers/carHandlers/index.js'
import m from '../Utils/middleIds.js';
import { verifyToken, checkRole } from '../Utils/validation/index.js'

const carRouter=Router();

carRouter.get('/car',  verifyToken, car.getCarHand);
carRouter.get('/car/:id', m.middUuid, verifyToken, car.getCarByIdHand);
carRouter.post('/car', verifyToken, checkRole([0,2]), car.createCarHand);
carRouter.put('/car/:id', m.middUuid, verifyToken, checkRole([0,2]), car.updateCarHand);
carRouter.patch('/car/:id',  m.middUuid, verifyToken, checkRole([0]), car.updDomCarHand);
carRouter.delete('/car/:id', m.middUuid, verifyToken, checkRole([0,2]), car.delCarHand);

export default carRouter;