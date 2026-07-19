import { AuthService } from './AuthService.js'
import { Auth } from '../../Shared/Auth/authMiddlewares.js'
import { responder } from '../../Shared/Utils/responder.js'
import { middError } from '../../Configs/errorHandlers.js'

export class AuthController {
  authService

  constructor (authService) {
    this.authService = authService
  }

  login = async (req, res) => {
    const { email, password } = req.body
    const userSessionData = await this.authService.login(email, password)

    // Guardamos en la sesión
    Auth.login(req, userSessionData)

    // Cookie visible para el cliente (para evitar requests innecesarios)
    res.cookie('logged_in', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7 // 7 días (ajustar según sesión)
    })

    responder(res, 200, true, 'Login exitoso', userSessionData)
  }

  logout = async (req, res) => {
    await Auth.logout(req)
    res.clearCookie('connect.sid', {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    })
    res.clearCookie('logged_in')
    responder(res, 200, true, 'Sesión cerrada', null)
  }

  me = async (req, res, next) => {
    const user = Auth.getSessionUser(req)
    if (!user) {
      return next(middError('No autenticado', 401))
    }
    responder(res, 200, true, 'Usuario recuperado', user)
  }
}
