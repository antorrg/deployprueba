import { ServicesApplications } from './applications/ServicesApplications.js'
import { UuidHandler } from '../../Shared/Utils/UuidHandler.js'

export class Service {
  serviceId
  carId
  type
  detail
  dateIn
  dateOut
  observations
  picture
  enabled
  canceled
  fullfilled
  constructor (
    serviceId,
    carId,
    type,
    detail,
    dateIn,
    dateOut,
    observations,
    picture,
    enabled,
    canceled,
    fullfilled
  ) {
    this.serviceId = ServicesApplications.Id(serviceId)
    this.carId = ServicesApplications.Id(carId)
    this.type = ServicesApplications.type(type)
    this.detail = ServicesApplications.detail(detail)
    this.dateIn = ServicesApplications.date_in(dateIn)
    this.dateOut = ServicesApplications.date_out(dateOut)
    this.observations = ServicesApplications.observations(observations)
    this.picture = ServicesApplications.picture(picture)
    this.enabled = ServicesApplications.enabled(enabled)
    this.canceled = ServicesApplications.canceled(canceled)
    this.fullfilled = ServicesApplications.fullfilled(fullfilled)
  }

  static register ({
    serviceId,
    carId,
    type,
    detail,
    dateIn,
    dateOut,
    observations,
    picture,
    enabled,
    canceled,
    fullfilled
  }) {
    return new Service({
      serviceId: UuidHandler.idCreator(),
      carId: ServicesApplications.Id(carId),
      type: ServicesApplications.type(type),
      detail: ServicesApplications.detail(detail),
      dateIn: new Date().toString(),
      dateOut: ServicesApplications.date_out(dateOut),
      observations: ServicesApplications.observations(observations),
      picture: ServicesApplications.picture(picture),
      enabled: true,
      canceled: false,
      fullfilled: false
    })
  }

  toDto () {
    return {
      serviceId: this.serviceId,
      carId: this.carId,
      type: this.type,
      detail: this.detail,
      dateIn: this.dateIn,
      dateOut: this.dateOut,
      observations: this.observations,
      picture: this.picture,
      enabled: this.enabled,
      canceled: this.canceled,
      fullfilled: this.fullfilled
    }
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
