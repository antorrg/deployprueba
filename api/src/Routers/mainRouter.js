import { Router } from "express";
import userRouter from "./userRouter.js";
import carRouter from "./carRouter.js";
import serviceRouter from './serviceRouter.js';
import categoryRouter from "./categoryRouter.js";
import postRouter from "./postRouter.js";
import provinceRouter from "./provinceRouter.js";
import reinitRouter from "./reinitRouter.js";
import providerRoutes from "./providerRoutes.js";
import commerceRoutes from "./commerceRoutes.js";

const mainRouter = Router();

mainRouter.use(userRouter);
mainRouter.use(carRouter);
mainRouter.use(serviceRouter);
mainRouter.use(categoryRouter);
mainRouter.use(postRouter);
mainRouter.use(provinceRouter);
mainRouter.use(reinitRouter);
mainRouter.use(providerRoutes);
mainRouter.use(commerceRoutes);

export default mainRouter;
