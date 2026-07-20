import { UuidHandler } from '../../../Shared/Utils/UuidHandler'

export class ServicesApplications {
  static Id (prop) {
    if (!prop || typeof (prop) !== 'string' || !UuidHandler.idValidator(prop)) {
      throw new Error('Formato de serviceId no valido')
    }
    return prop
  }

  static type (prop) {
    if (!prop || typeof (prop) !== 'string') throw new Error('Type no valido o ausente')
    const type = prop.trim().toUpperCase()
    const allowed = ['SERVICE', 'PRESUPUESTO', 'REPARACION']
    if (!allowed.includes(type)) {
      throw new Error('Type no valido')
    }
    return type
  }

  static detail (prop) {
    if (prop !== undefined && typeof prop !== 'string') throw new Error('Invalid detail')
    return prop
  }

  static dateIn (prop) {
    if (prop !== undefined && typeof prop !== 'string') throw new Error('Invalid date_in')
    return prop
  }

  static dateOut (prop) {
    if (prop !== undefined && typeof prop !== 'string') throw new Error('Invalid date_out')
    return prop
  }

  static observations (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid observations')
    return prop
  }

  static picture (prop) {
    if (typeof prop !== 'string') throw new Error('Invalid picture')
    return prop
  }

  static enabled (prop) {
    if (typeof prop !== 'boolean') throw new Error('Invalid enabled')
    return prop
  }

  static canceled (prop) {
    if (typeof prop !== 'boolean') throw new Error('Invalid canceled')
    return prop
  }

  static fullfilled (prop) {
    if (typeof prop !== 'boolean') throw new Error('Invalid fullfilled')
    return prop
  }
}

/*  serviceId: string //UUid

    type:string

    detail:string

    date_in: Date

    date_out: Date

    observations:string

    picture?:string

    enabled:boolean

    canceled?:boolean = false
    fullfilled?: boolean = false

  ) */
