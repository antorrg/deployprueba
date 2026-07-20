import { ServicesApplications } from "./applications/ServicesApplications.js";
import { UuidHandler } from "../../Shared/Utils/UuidHandler.js";

export class Services{
    serviceId
    carId
    type
    detail
    date_in
    date_out
    observations
    picture
    enabled
    canceled
    fullfilled
    constructor(
    serviceId,
    type,
    detail,
    date_in,
    date_out,
    observations,
    picture,
    enabled,
    canceled,
    fullfilled
    ){
            this.serviceId = ServicesApplications.Id(serviceId)
            this.carId = ServicesApplications.Id(carId)
            this.type = ServicesApplications.type(type)
            this.detail = ServicesApplications.detail(detail)
            this.date_in = ServicesApplications.date_in(date_in)
            this.date_out = ServicesApplications.date_out(date_out)
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
    date_in,
    date_out,
    observations,
    picture,
    enabled,
    canceled,
    fullfilled
      }) {
        return new Service({
            serviceId = UuidHandler.idCreator(),
            carId= ServicesApplications.Id(carId),
            type = ServicesApplications.type(type),
            detail = ServicesApplications.detail(detail),
            date_in = new Date(),
            date_out = ServicesApplications.date_out(date_out),
            observations = ServicesApplications.observations(observations),
            picture = ServicesApplications.picture(picture),
            enabled = true,
            canceled = false,
            fullfilled = false
        })
      }
        toDto () {
    return {
    serviceId:this.serviceId,
    type: this.type,
    detail: this.detail,
    date_in: this.date_in,
    date_out: this.date_out,
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
