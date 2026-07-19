import envConfig from '../../Configs/envConfig.js'
import { UuidHandler } from '../../Shared/Utils/UuidHandler.js'
import { UserApplications } from './applications/UserApplications.js'

export class User {
  userId
  email
  password
  typeId
  numberId
  role
  name
  nickname
  picture
  enabled

  constructor ({ userId, email, password, typeId, numberId, role, name, nickname, picture, enabled }) {
    this.userId = UserApplications.Id(userId)
    this.email = UserApplications.Email(email)
    this.password = User.validatePasswordHash(password)
    this.typeId = UserApplications.typeId(typeId)
    this.numberId = User.validateNumberId(numberId)
    this.role = UserApplications.Role(role)
    this.name = User.validateName(name)
    this.nickname = User.validateNickname(nickname)
    this.picture = User.validatePicture(picture)
    this.enabled = User.validateEnabled(enabled)
  }

  static validatePasswordHash (prop) {
    if (typeof prop !== 'string' || prop.length < 20) throw new Error('Invalid password hash')
    return prop
  }

  static validateName (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid name')
    return prop
  }

  static validateNumberId (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid name')
    return prop
  }

  static validatePicture (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid name')
    return prop
  }

  static validateNickname (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid nickname')
    return prop
  }

  static validateEnabled (prop) {
    if (typeof prop !== 'boolean') throw new Error('Invalid enabled')
    return prop
  }

  static register ({ email, hashedPassword, typeId, numberId }) {
    if (!email || !hashedPassword) throw new Error('Missing parameters')
    return new User({
      userId: UuidHandler.idCreator(),
      email: UserApplications.Email(email),
      password: User.validatePasswordHash(hashedPassword),
      typeId: UserApplications.typeId(typeId),
      numberId: User.validateNumberId(numberId),
      name: 'Falta completar',
      nickname: User.validateNickname(email?.split('@')[0] ?? 'Usuario'),
      picture: envConfig.UserImg,
      role: 'USUARIO',
      enabled: true
    })
  }

  // Métodos de dominio (cambios de estado autorizados)
  disableEnableUser (value) {
    const state = User.validateEnabled(value)
    if (this.enabled !== state) {
      this.enabled = state
    }
    return this.enabled
  }

  changePassword (hashedPassword) {
    this.password = User.validatePasswordHash(hashedPassword)
  }

  changeRole (role) {
    this.role = UserApplications.Role(role)
  }

  updateProfile (user) {
    this.email = UserApplications.Email(user.email)
    this.name = User.validateName(user.name)
    this.nickname = User.validateNickname(user.nickname)
    this.picture = User.validatePicture(user.picture)
  }

  // Mapeos para Infraestructura (DB) y Cliente (DTO)
  toPersistence () {
    return {
      userId: this.userId,
      email: this.email,
      password: this.password,
      typeId: this.typeId,
      numberId: this.numberId,
      role: this.role, // Cast por si el enum de Drizzle require formato especifico
      name: this.name,
      nickname: this.nickname,
      picture: this.picture,
      enabled: this.enabled
    }
  }

  toDTO () {
    return {
      userId: this.userId,
      email: this.email,
      typeId: this.typeId,
      numberId: this.numberId,
      role: this.role,
      name: this.name,
      nickname: this.nickname,
      picture: this.picture,
      enabled: this.enabled
    }
  }
}
