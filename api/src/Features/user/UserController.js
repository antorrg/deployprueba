import { responder } from '../../Shared/Utils/responder.js'
import { userService } from '../../Shared/dependencies.js'
import * as auth from '../../Shared/Auth/authMiddlewares.js'

export class UserController {
  constructor (
    service
  ) {
    this.service = service
  }

  getAll = async (req, res) => {
    const { numberId } = req.query
    if (numberId) {
      const response = await this.service.getUsersByQuery(numberId)
      return responder(res, 200, true, 'Usuarios encontrados', response)
    } else {
      const response = await this.service.getUsers()
      return responder(res, 200, true, 'Listado de usuarios', response)
    }
  }

  getById = async (req, res) => {
    const { userId } = req.params
    const response = await this.service.getUserById(userId)
    return responder(res, 200, true, 'Usuario encontrado', response)
  }

  create = async (req, res) => {
    const data = req.body
    // UserService expects passwordRaw, but validation schema validates 'password'
    const response = await this.service.registerUser({ ...data, passwordRaw: data.password })
    return responder(res, 201, true, 'Usuario creado', response)
  }

  updateProfile = async (req, res) => {
    const { userId } = req.params
    const data = req.body
    const response = await this.service.updateProfile(userId, data)
    return responder(res, 200, true, 'Perfil actualizado', response)
  }

  upgrade = async (req, res) => {
    const { userId } = req.params
    const data = req.body
    const response = await this.service.upgradeUser(userId, data)
    return responder(res, 200, true, 'Rol de usuario actualizado', response)
  }

  changePassword = async (req, res) => {
    const data = req.body
    // Requires id, password, newPassword from schema
    const response = await this.service.changePassword(data.id, data.password, data.newPassword)
    return responder(res, 200, true, 'Contraseña actualizada', response)
  }

  resetPassword = async (req, res) => {
    const userId = req.body.id || req.body.userId // adjust to your frontend logic
    const response = await this.service.resetPassword(userId)
    return responder(res, 200, true, 'Contraseña reseteada', response)
  }

  delete = async (req, res) => {
    const { userId } = req.params
    const response = await this.service.deleteUser(userId)
    return responder(res, 200, true, response, null)
  }
}
