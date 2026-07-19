import { UuidHandler } from '../../../Shared/Utils/UuidHandler.js'

export class UserApplications {
  static Id (prop) {
    if (!prop || typeof (prop) !== 'string' || !UuidHandler.idValidator(prop)) {
      throw new Error('Formato de id no valido')
    }
    return prop
  }

  static Email (prop) {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!prop || typeof (prop) !== 'string' || !regexEmail.test(prop)) {
      throw new Error('Formato de email no valido')
    }
    return prop.toLowerCase()
  }

  static Role (prop) {
    if (!prop || typeof (prop) !== 'string') throw new Error('Rol no valido o ausente')
    const role = prop.trim().toUpperCase()
    const allowed = ['DUENO', 'ADMIN', 'MECANICO', 'USUARIO']
    if (!allowed.includes(role)) {
      throw new Error('Rol no valido')
    }
    return role
  }

  static typeId (prop) {
    if (!prop || typeof (prop) !== 'string') throw new Error('TypeId no valido o ausente')
    const typeId = prop.trim().toUpperCase()
    const allowed = ['DNI', 'PASAPORTE', 'CUIT', 'CUIL']
    if (!allowed.includes(typeId)) {
      throw new Error('TypeId no valido')
    }
    return typeId
  }
}
