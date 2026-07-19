import express from 'express'
import { AuthController } from './AuthController.js'
import { authService } from '../../Shared/dependencies.js'

const authController = new AuthController(authService)

const authRouter = express.Router()

authRouter.post('/login', authController.login)
authRouter.get('/me', authController.me)
authRouter.post('/logout', authController.logout)

export default authRouter
