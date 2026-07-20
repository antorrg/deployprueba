// import * as db from '../Configs/database.js'
import { UserRepository } from '../Features/user/UserRepository.js'
import { UserService } from '../Features/user/UserService.js'
import { CarRepository } from '../Features/car/CarRepository.js'
import { CarService } from '../Features/car/CarService.js'
import { AuthService } from '../Features/auth/AuthService.js'
import envConfig from '../Configs/envConfig.js'

let imageUploader = null
let deleteImageByUrl = null

if (envConfig.Status !== 'production') {
  // Importación dinámica: este módulo no se evaluará ni se incluirá
  // a menos que no estemos en producción.
  const { ImagesLocals } = await import('../../test/helpers/imagesService/Images.local.js')
  imageUploader = ImagesLocals.save // eslint-disable-line no-unused-vars
  deleteImageByUrl = ImagesLocals.remove
} else {
  // Aquí se importará el servicio externo real para Cloudinary, AWS S3, etc.
  // const { ImagesExternal } = await import('../Services/Images.external.js')
  // imageUploader = ImagesExternal.save
  // deleteImageByUrl = ImagesExternal.remove
}

const user = new UserRepository()
const car = new CarRepository()

export const userService = new UserService(user, deleteImageByUrl)
export const carService = new CarService(car, deleteImageByUrl, 'picture')
export const authService = new AuthService(user)
