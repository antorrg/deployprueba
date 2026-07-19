import { Car } from './Car.js'
import { throwError } from '../../Configs/errorHandlers.js'

export class CarService {
  carRepository
   imageDeleter
   imageField

  constructor(carRepository,  imageDeleter, imageField='picture') {
    this.carRepository = carRepository
    this.imageDeleter = imageDeleter
    this.imageField = imageField
  }

  async getCars() {
    return await this.carRepository.getCars()
  }

  async getCarById(id) {
    return await this.carRepository.carById(id)
  }

  async getCarByQuery(patent) {
    return await this.carRepository.carByQuery(patent)
  }

  async registerCar(data) {
    const newCar = Car.register({
      userId: data.userId,
      patent: data.patent,
      mark: data.mark,
      model: data.model,
      year: data.year,
      motorNum: data.motorNum,
      chassisNum: data.chassisNum,
      observations: data.observations,
      picture: data.picture
    })

    await this.carRepository.save(newCar)
    return newCar.toDto()
  }

  async updateCar(id, updateData) {
    const car = await this.carRepository.getById(id)
    if (!car) {
      throwError('Vehículo no encontrado', 404)
    }
    let oldPictureUrl = null
    let isNewImage = false
    const currentImageUrl = car[this.imageField]
    const newImageUrl = updateData[this.imageField]

    if (newImageUrl !== undefined && currentImageUrl !== newImageUrl) {
      oldPictureUrl = currentImageUrl
      isNewImage = true
    }

    car.updateData(updateData)

    const updatedCar = await this.carRepository.update(id, car)

      if (isNewImage && oldPictureUrl && this.imageDeleter) {
      await this.imageDeleter(oldPictureUrl)
    }
    return updatedCar ? updatedCar.toDto() : car.toDto()
  }

  async changeOwner(carId, newUserId) {
    // 1. Obtener el vehículo actual (para validar que exista)
    const car = await this.carRepository.getById(carId)
    if (!car) {
      throwError('Vehículo no encontrado', 404)
    }

    // 2. Modificar el propietario a nivel de base de datos
    await this.carRepository.changeOwner(carId, newUserId)
    
    // Opcional: Modificar también la entidad en memoria si hiciera falta
    car.changeOwner(newUserId)

    return `Titularidad del vehículo actualizada exitosamente.`
  }

  async deleteCar(id) {
    const car = await this.carRepository.getById(id)
    if (!car) throwError('Vehículo no encontrado', 404)
    const oldPictureUrl = car[this.imageField]
    
    await this.carRepository.delete(id)

        if (oldPictureUrl && this.imageDeleter) {
      await this.imageDeleter(oldPictureUrl)
    }
    return `Vehículo eliminado exitosamente`
  }
}
