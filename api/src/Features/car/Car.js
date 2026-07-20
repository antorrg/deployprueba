import { CarApplications } from './applications/CarApplications.js'
import { UuidHandler } from '../../Shared/Utils/UuidHandler.js'

export class Car {
  id
  userId
  patent
  mark
  model
  year
  motorNum
  chassisNum
  observations
  picture
  enabled
  constructor ({ id, userId, patent, mark, model, year, motorNum, chassisNum, observations, picture, enabled }) {
    this.id = CarApplications.Id(id)
    this.userId = CarApplications.Id(userId)
    this.patent = CarApplications.patent(patent)
    this.mark = CarApplications.mark(mark)
    this.model = CarApplications.model(model)
    this.year = CarApplications.year(year)
    this.motorNum = CarApplications.motorNum(motorNum)
    this.chassisNum = CarApplications.chassisNum(chassisNum)
    this.observations = CarApplications.observations(observations)
    this.picture = CarApplications.picture(picture)
    this.enabled = CarApplications.enabled(enabled)
  }

  static register ({
    userId,
    patent,
    mark,
    model,
    year,
    motorNum,
    chassisNum,
    observations = 'Sin observaciones',
    picture = 'default.jpg'
  }) {
    return new Car({
      id: UuidHandler.idCreator(),
      userId: CarApplications.Id(userId),
      patent: CarApplications.patent(patent),
      mark: CarApplications.mark(mark),
      model: CarApplications.model(model),
      year: CarApplications.year(year),
      motorNum: CarApplications.motorNum(motorNum),
      chassisNum: CarApplications.chassisNum(chassisNum),
      observations: CarApplications.observations(observations),
      picture: CarApplications.picture(picture),
      enabled: true
    })
  }

  updateData (data) {
    if (data.patent !== undefined) this.patent = CarApplications.patent(data.patent)
    if (data.mark !== undefined) this.mark = CarApplications.mark(data.mark)
    if (data.model !== undefined) this.model = CarApplications.model(data.model)
    if (data.year !== undefined) this.year = CarApplications.year(data.year)
    if (data.motorNum !== undefined) this.motorNum = CarApplications.motorNum(data.motorNum)
    if (data.chassisNum !== undefined) this.chassisNum = CarApplications.chassisNum(data.chassisNum)
    if (data.observations !== undefined) this.observations = CarApplications.observations(data.observations)
    if (data.picture !== undefined) this.picture = CarApplications.picture(data.picture)
  }

  changeOwner (newUserId) {
    this.userId = CarApplications.Id(newUserId)
  }

  toDto () {
    return {
      id: this.id,
      userId: this.userId,
      patent: this.patent,
      mark: this.mark,
      model: this.model,
      year: this.year,
      motorNum: this.motorNum,
      chassisNum: this.chassisNum,
      observations: this.observations,
      picture: this.picture,
      enabled: this.enabled
    }
  }
}
/*
id
userId
patent
mark
model
year
motorNum
chassisNum
observations
picture
enabled
*/
