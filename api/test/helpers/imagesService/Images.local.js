import path from 'node:path'
import fs from 'node:fs/promises'
import envConfig from '../../../src/Configs/envConfig.js'

const uploadDir = envConfig.TestImagesUploadDir

export class ImagesLocals {
  static save = async (file) => {
    await ImagesLocals.#createLocalFolder()

    const originalName = file.originalname || 'image.jpg'
    const fileName = `${Date.now()}-${originalName}`
    const destPath = path.join(uploadDir, fileName)

    if (file.buffer) {
      // Si multer usó memoryStorage
      await fs.writeFile(destPath, file.buffer)
    } else if (file.path) {
      // Si multer usó diskStorage
      await fs.copyFile(file.path, destPath)
    } else {
      throw new Error('Archivo inválido: multer debe proveer buffer o path')
    }

    // Retorna la ruta como emulación de URL externa
    return destPath
  }

  static remove = async (imageUrl) => {
    try {
      await fs.access(imageUrl)
      await fs.unlink(imageUrl)
      return true
    } catch (error) {
      console.error(`Error al eliminar la imagen local: ${error.message}`)
      return false
    }
  }

  static async #createLocalFolder () {
    // asegurar que la carpeta uploads existe
    return await fs.mkdir(uploadDir, { recursive: true })
  }
}
export async function prepareTestImages (q = 1, name = 'image') {
  // Asegurar que la carpeta uploads existe
  await fs.mkdir(uploadDir, { recursive: true })

  const created = []

  // Crear la cantidad de archivos solicitada (vacíos, para emulación)
  for (let i = 1; i <= q; i++) {
    const fileName = `${name}${i}.jpg`
    const dest = path.join(uploadDir, fileName)

    await fs.writeFile(dest, '')
    created.push(fileName)
  }

  return created
}
