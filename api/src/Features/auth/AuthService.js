import { throwError } from '../../Configs/errorHandlers.js'
import { Hasher } from '../../Shared/Utils/Hasher.js'

export class AuthService {
  constructor (userRepository) {
    this.userRepository = userRepository
  }

  async login (email, password) {
    const user = await this.userRepository.getAuthCredentials(email)

    if (!user || !user.password) {
      throwError('Credenciales inválidas', 401)
    }

    const isMatch = await Hasher.compare(password, user.password)
    if (!isMatch) {
      throwError('Credenciales inválidas', 401)
    }

    if (!user.enabled) {
      throwError('Cuenta deshabilitada', 403)
    }

    // Retornamos solo lo necesario para la sesión
    return {
      id: user.userId,
      email: user.email,
      role: user.role
    }
  }
}
