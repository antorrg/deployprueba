import express from 'express'
import { UserController } from './UserController.js'
import { userService } from '../../Shared/dependencies.js'
import { Validator } from '../../Shared/Middlewares/validator/Validator.js'
import * as sch from './userschemas.js'
import { authorizeMinRole, authorize, UserRole } from '../../Shared/Auth/authMiddlewares.js'

const controller = new UserController(userService)
const userRouter = express.Router()

userRouter.get(
  '/user',
  authorizeMinRole(UserRole.MECANICO),
  Validator.validateQuery(sch.userQuery),
  controller.getAll
)

userRouter.get(
  '/user/:userId',
  authorizeMinRole(UserRole.USUARIO),
  Validator.paramId('userId', Validator.ValidReg.UUIDall),
  controller.getById
)

userRouter.post(
  '/user/create',
  authorizeMinRole(UserRole.MECANICO),
  Validator.validateBody(sch.create),
  controller.create
)

userRouter.post(
  '/user',
  authorizeMinRole(UserRole.MECANICO),
  Validator.validateBody(sch.changePassword),
  controller.changePassword
)

userRouter.put(
  '/user/:userId',
  authorizeMinRole(UserRole.MECANICO),
  Validator.paramId('userId', Validator.ValidReg.UUIDall),
  Validator.validateBody(sch.updateProfile),
  controller.updateProfile
)

userRouter.patch(
  '/user/:userId',
  authorize(UserRole.DUENO),
  Validator.paramId('userId', Validator.ValidReg.UUIDall),
  Validator.validateBody(sch.upgradeUser),
  controller.upgrade
)

userRouter.delete(
  '/user/:userId',
  authorize(UserRole.DUENO),
  Validator.paramId('userId', Validator.ValidReg.UUIDall),
  controller.delete
)

export default userRouter
