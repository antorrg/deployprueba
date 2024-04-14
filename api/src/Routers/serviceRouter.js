import {Router} from 'express';
import { createServiceHand, getServiceHand, getServiceIdHand, updateServiceHand, delServiceHand} from '../Handlers/serviceHandlers/serviceHand.js'

const serviceRouter = Router();

serviceRouter.get('/service', getServiceHand);
serviceRouter.get('/service/:id', getServiceIdHand);
serviceRouter.post('/service', createServiceHand);
serviceRouter.put('/service/:id', updateServiceHand);
serviceRouter.delete('/service/:id', delServiceHand);

export default serviceRouter;