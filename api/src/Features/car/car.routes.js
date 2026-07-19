import express from 'express'
import { CarController } from './CarController.js'
import { carService } from '../../Shared/dependencies.js'
import { Validator } from '../../Shared/Middlewares/validator/Validator.js'
import * as sch from './carSchemas.js'
import { authorizeMinRole, authorize, UserRole } from '../../Shared/Auth/authMiddlewares.js'

const controller = new CarController(carService)
const carRouter = express.Router()

carRouter.get(
  '/car',
  authorizeMinRole(UserRole.MECANICO),
  Validator.validateQuery(sch.carQuery),
  controller.getAll
)

carRouter.get(
  '/car/:carId',
  authorizeMinRole(UserRole.USUARIO),
  Validator.paramId('carId', Validator.ValidReg.UUIDall),
  controller.getById
)

carRouter.post(
  '/car',
  authorizeMinRole(UserRole.MECANICO),
  Validator.validateBody(sch.createCar),
  controller.create
)

carRouter.put(
  '/car/:carId',
  authorizeMinRole(UserRole.MECANICO),
  Validator.paramId('carId', Validator.ValidReg.UUIDall),
  Validator.validateBody(sch.updateCar),
  controller.update
)

carRouter.patch(
  '/car/:carId/owner',
  authorizeMinRole(UserRole.MECANICO),
  Validator.paramId('carId', Validator.ValidReg.UUIDall),
  Validator.validateBody(sch.changeOwner),
  controller.changeOwner
)

carRouter.delete(
  '/car/:carId',
  authorize(UserRole.DUENO),
  Validator.paramId('carId', Validator.ValidReg.UUIDall),
  controller.delete
)

export default carRouter
