import express from 'express'
import userRouter from './Features/user/user.routes.js'
import authRouter from './Features/auth/auth.routes.js'
import carRouter from './Features/car/car.routes.js'
// import serviceRouter from './Routers/serviceRouter.js'
// import categoryRouter from './Routers/categoryRouter.js'
// import postRouter from './Routers/postRouter.js'
// import provinceRouter from './Routers/provinceRouter.js'
// import providerRoutes from './Routers/providerRoutes.js'
// import commerceRoutes from './Routers/commerceRoutes.js'

const mainRouter = express.Router()

mainRouter.use('/auth', authRouter)
mainRouter.use(userRouter)
mainRouter.use(carRouter)
// mainRouter.use(serviceRouter)
// mainRouter.use(categoryRouter)
// mainRouter.use(postRouter)
// mainRouter.use(provinceRouter)
// mainRouter.use(providerRoutes)
// mainRouter.use(commerceRoutes)

export default mainRouter
