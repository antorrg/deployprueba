import {Router} from 'express'
import sv from '../Handlers/serviceControllers.js'
import m from '../Utils/middleIds.js';
const serviceRouter=Router();

serviceRouter.get('/service', sv.getServiceHand);
serviceRouter.get('/service/:id', m.middUuid, sv.getServiceIdHand);
serviceRouter.post('/service', sv.createServiceHand);
serviceRouter.put('/service/:id', m.middUuid,sv.updateServiceHand);
serviceRouter.delete('/service/:id', m.middUuid, sv.delServiceHand);

export default serviceRouter;