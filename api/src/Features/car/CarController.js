import { responder } from '../../Shared/Utils/responder.js'

export class CarController {
  constructor (service) {
    this.service = service
  }

  getAll = async (req, res) => {
    const { patent } = req.query
    if (patent) {
      const response = await this.service.getCarByQuery(patent)
      return responder(res, 200, true, 'Vehículo encontrado', response)
    } else {
      const response = await this.service.getCars()
      return responder(res, 200, true, 'Listado de vehículos', response)
    }
  }

  getById = async (req, res) => {
    const { carId } = req.params
    const response = await this.service.getCarById(carId)
    return responder(res, 200, true, 'Vehículo encontrado', response)
  }

  create = async (req, res) => {
    const data = req.body
    const response = await this.service.registerCar(data)
    return responder(res, 201, true, 'Vehículo registrado exitosamente', response)
  }

  update = async (req, res) => {
    const { carId } = req.params
    const data = req.body
    const response = await this.service.updateCar(carId, data)
    return responder(res, 200, true, 'Vehículo actualizado', response)
  }

  changeOwner = async (req, res) => {
    const { carId } = req.params
    const { userId } = req.body // El nuevo userId al que se le asignará el coche
    const response = await this.service.changeOwner(carId, userId)
    return responder(res, 200, true, 'Titularidad actualizada', response)
  }

  delete = async (req, res) => {
    const { carId } = req.params
    const response = await this.service.deleteCar(carId)
    return responder(res, 200, true, response, null)
  }
}
