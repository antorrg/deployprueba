import { User } from './User.js'
import { Hasher } from '../../Shared/Utils/Hasher.js'
import { throwError } from '../../Configs/errorHandlers.js'
import { generatePassword } from './generateNewPassword.js'

export class UserService {
  userRepository
  imageDeleter
  notifier// : (email: string, newPassword: string) => Promise<void>
  imageField

  constructor (
    userRepository,
    imageDeleter,
    imageField = 'picture',
    notifier = async (email, newPassword) => {
      console.log(`[Notifier] Nueva contraseña para ${email}: ${newPassword}`)
    }
  ) {
    this.userRepository = userRepository
    this.imageDeleter = imageDeleter
    this.notifier = notifier
    this.imageField = imageField // Campo de imagen a tratar
  }

  mapToPublic (record) {
    return {
      userId: record.userId,
      email: record.email,
      role: record.role,
      name: record.name,
      nickname: record.nickname,
      picture: record.picture,
      enabled: record.enabled
    }
  }

  /**
     * Registra un nuevo usuario en el sistema.
     * Hashea la contraseña y delega la creación a la Entidad y al Repositorio.
     */
  async registerUser (data) { // { email: string; passwordRaw: string }
    // 1. Hashear la contraseña (preocupación de infraestructura/aplicación)
    const hashedPassword = await Hasher.hash(data.passwordRaw)

    // 2. Crear la Entidad de Dominio (esto genera el UUID y valida reglas)
    const newUser = User.register({
      email: data.email,
      hashedPassword,
      typeId: data.typeId,
      numberId: data.numberId
    })

    // 3. Guardar en la base de datos (El repositorio valida si el email ya existe)
    await this.userRepository.save(newUser)

    // 4. Retornamos el DTO
    return newUser.toDTO()
  }

  /**
     * Actualiza el perfil básico del usuario.
     */
  async updateProfile (userId, updateData) {
    // 1. Buscar el usuario existente
    const user = await this.userRepository.getById(userId)
    if (!user) {
      throwError('Usuario no encontrado', 404)
    }
    const oldUser = user.toDTO()
    UserService.#protectProtocol(oldUser.role)

    let oldPictureUrl = null
    let isNewImage = false
    const currentImageUrl = oldUser[this.imageField]
    const newImageUrl = updateData[this.imageField]

    if (newImageUrl !== undefined && currentImageUrl !== newImageUrl) {
      oldPictureUrl = currentImageUrl
      isNewImage = true
    }

    // 2. Modificar el estado a través de los métodos de dominio
    user.updateProfile(updateData)

    // 3. Guardar los cambios (usamos update para estar seguros de que no es creación)
    const updatedUser = await this.userRepository.update(userId, user)

    if (isNewImage && oldPictureUrl && this.imageDeleter) {
      await this.imageDeleter(oldPictureUrl)
    }

    return updatedUser.toDTO()
  }

  /**
     * Cambia la contraseña de un usuario existente.
     */
  async changePassword (userId, password, newPasswordRaw) {
    const user = await this.userRepository.getById(userId)
    if (!user) {
      throwError('Usuario no encontrado', 404)
    }
    const oldUser = user.toPersistence()
    UserService.#protectProtocol(oldUser.role)
    const passwordMatch = await Hasher.compare(password, oldUser.password)
    if (!passwordMatch) { throwError('Contraseña invalida', 400) }

    const newHashedPassword = await Hasher.hash(newPasswordRaw)

    user.changePassword(newHashedPassword)

    const updatedUser = await this.userRepository.update(userId, user)
    return updatedUser.toDTO()
  }

  /**
     * Crea un password nuevo aleatorio
     */
  async resetPassword (userId) {
    const user = await this.userRepository.getById(userId)
    if (!user) {
      throwError('Usuario no encontrado', 404)
    }
    const userFound = user.toPersistence()
    UserService.#protectProtocol(userFound.role)
    const newPasswordRaw = generatePassword()

    // await this.notifier(userFound.email, newPasswordRaw)
    console.log('Este es el nuevo password: ', userFound.email, newPasswordRaw)

    const newHashedPassword = await Hasher.hash(newPasswordRaw)
    user.changePassword(newHashedPassword)

    const updatedUser = await this.userRepository.update(userId, user)
    return updatedUser.toDTO()
  }

  /**
     * Cambia el rol de usuario.
     */
  async upgradeUser (userId, data) {
    const allowedNewRole = ['ADMIN', 'MECANICO', 'USUARIO']
    if (!allowedNewRole.includes(data.role)) { throwError('Rol no valido', 400) }

    const user = await this.userRepository.getById(userId)
    if (!user) {
      throwError('Usuario no encontrado', 404)
    }
    const oldUser = user.toPersistence()
    UserService.#protectProtocol(oldUser.role)
    user.changeRole(data.role)
    user.disableEnableUser(data.enabled)
    const updatedUser = await this.userRepository.update(userId, user)
    return updatedUser.toDTO()
  }

  /**
     * Elimina a un usuario
     */
  async deleteUser (userId) {
    const user = await this.userRepository.getById(userId)
    if (!user) throwError('Usuario no encontrado', 404)
    const userForDelete = user.toDTO()
    UserService.#protectProtocol(userForDelete.role)
    const oldPictureUrl = userForDelete[this.imageField]
    const message = userForDelete.email
    await this.userRepository.delete(userId)

    if (oldPictureUrl && this.imageDeleter) {
      await this.imageDeleter(oldPictureUrl)
    }

    return `Usuarion con email: ${message} eliminado exitosamente`
  }

  /**
     * Compara el password y enabled y da acceso al usuario
     */
  async login (email, password) {
    const user = await this.userRepository.findByEmail(email)
    if (!user) { throwError('Usuario no encontrado', 401) }
    if (user.toDTO().enabled === false) { throwError('Usuario bloqueado', 401) }

    const passwordMatch = await Hasher.compare(password, user.toPersistence().password)
    if (!passwordMatch) { throwError('Contraseña invalida', 400) }

    return user.toDTO()
  }

  /**
     *
     * Entrega un array de usuarios
     */
  async getUsers () {
    const users = await this.userRepository.getUsers()
    return users
  }

  async getUsersByQuery (query) {
    const user = await this.userRepository.userByQuery(query)
    return user
  }

  async getUserById (userId) {
    const user = await this.userRepository.userById(userId)
    return user
  }

  static #protectProtocol (role) {
    if (role === 'DUENO')throwError('No se puede editar a un propietario', 403)
  }
}
