import { UuidHandler } from '../../../Shared/Utils/UuidHandler.js'

export class CarApplications {
  static Id (prop) {
    if (!prop || typeof (prop) !== 'string' || !UuidHandler.idValidator(prop)) {
      throw new Error('Formato de id no valido')
    }
    return prop
  }

  static patent (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid plate')
    return prop
  }

  static mark (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid brand')
    return prop
  }

  static model (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid model')
    return prop
  }

  static year (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid year')
    return prop
  }

  static motorNum (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid motor number')
    return prop
  }

  static chassisNum (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid chassis number')
    return prop
  }

  static enabled (prop) {
    if (typeof prop !== 'boolean') throw new Error('Invalid enabled')
    return prop
  }

  static observations (prop) {
    if (prop !== undefined && typeof prop !== 'string') throw new Error('Invalid observations')
    return prop
  }

  static picture (prop) {
    if (prop !== undefined && typeof prop !== 'string') throw new Error('Invalid picture')
    return prop
  }
}
