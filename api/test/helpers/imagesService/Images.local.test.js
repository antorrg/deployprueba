import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs/promises'
import { ImagesLocals, prepareTestImages } from './Images.local.js'
import envConfig from '../../../src/Configs/envConfig.js'

// Mockeamos el módulo fs/promises para no tocar el sistema de archivos real
vi.mock('node:fs/promises')

describe('Images Service Local Emulation', () => {
  beforeEach(() => {
    // Limpiamos los mocks antes de cada test para evitar interferencias
    vi.clearAllMocks()
  })

  describe('ImagesLocals class', () => {
    describe('save()', () => {
      it('debería guardar un archivo cuando multer provee un buffer (memoryStorage)', async () => {
        const file = {
          originalname: 'memory-test.jpg',
          buffer: Buffer.from('fake image data')
        }

        fs.mkdir.mockResolvedValue(true)
        fs.writeFile.mockResolvedValue(true)

        const resultPath = await ImagesLocals.save(file)

        // Verificamos que asegure el directorio
        expect(fs.mkdir).toHaveBeenCalledWith(envConfig.TestImagesUploadDir, { recursive: true })

        // Verificamos que se escriba el archivo
        expect(fs.writeFile).toHaveBeenCalledWith(
          expect.stringContaining('memory-test.jpg'),
          file.buffer
        )

        // Debe devolver un string (path del destino emulando URL)
        expect(typeof resultPath).toBe('string')
        expect(resultPath).toContain('memory-test.jpg')
      })

      it('debería copiar un archivo cuando multer provee un path temporal (diskStorage)', async () => {
        const file = {
          originalname: 'disk-test.png',
          path: '/tmp/multer-temp-file-1234'
        }

        fs.mkdir.mockResolvedValue(true)
        fs.copyFile.mockResolvedValue(true)

        const resultPath = await ImagesLocals.save(file)

        // Verificamos que se copie el archivo desde el temporal al destino
        expect(fs.copyFile).toHaveBeenCalledWith(
          file.path,
          expect.stringContaining('disk-test.png')
        )

        expect(resultPath).toContain('disk-test.png')
      })

      it('debería lanzar un error si el archivo de multer no contiene buffer ni path', async () => {
        const file = { originalname: 'invalid.jpg' } // Falta buffer y path

        await expect(ImagesLocals.save(file)).rejects.toThrow(
          'Archivo inválido: multer debe proveer buffer o path'
        )
      })
    })

    describe('remove()', () => {
      it('debería eliminar el archivo si este existe localmente', async () => {
        const fakeImageUrl = '/fake/upload/dir/123-image.jpg'

        // Simulamos que el archivo sí existe (access se resuelve correctamente)
        fs.access.mockResolvedValue()
        fs.unlink.mockResolvedValue()

        const result = await ImagesLocals.remove(fakeImageUrl)

        expect(fs.access).toHaveBeenCalledWith(fakeImageUrl)
        expect(fs.unlink).toHaveBeenCalledWith(fakeImageUrl)
        expect(result).toBe(true)
      })

      it('debería retornar false sin romper la app si el archivo no existe u ocurre un error', async () => {
        const fakeImageUrl = '/fake/upload/dir/not-found.jpg'

        // Simulamos que no existe o hay problema de permisos
        fs.access.mockRejectedValue(new Error('ENOENT: no such file or directory'))

        const result = await ImagesLocals.remove(fakeImageUrl)

        expect(fs.access).toHaveBeenCalledWith(fakeImageUrl)
        // No debe llegar a intentar borrarlo si falló el access
        expect(fs.unlink).not.toHaveBeenCalled()
        expect(result).toBe(false)
      })
    })
  })

  describe('prepareTestImages()', () => {
    it('debería crear la cantidad solicitada de archivos vacíos con el prefijo por defecto', async () => {
      fs.mkdir.mockResolvedValue(true)
      fs.writeFile.mockResolvedValue(true)

      // Solicitamos crear 3 imágenes
      const result = await prepareTestImages(3)

      expect(fs.mkdir).toHaveBeenCalledWith(envConfig.TestImagesUploadDir, { recursive: true })

      // Debe haber creado exactamente 3 archivos vacíos
      expect(fs.writeFile).toHaveBeenCalledTimes(3)
      expect(fs.writeFile).toHaveBeenNthCalledWith(1, expect.stringContaining('image1.jpg'), '')
      expect(fs.writeFile).toHaveBeenNthCalledWith(2, expect.stringContaining('image2.jpg'), '')
      expect(fs.writeFile).toHaveBeenNthCalledWith(3, expect.stringContaining('image3.jpg'), '')

      // El resultado debe contener los nombres generados
      expect(result).toEqual(['image1.jpg', 'image2.jpg', 'image3.jpg'])
    })

    it('debería usar un nombre base personalizado si se provee', async () => {
      fs.mkdir.mockResolvedValue(true)
      fs.writeFile.mockResolvedValue(true)

      const result = await prepareTestImages(2, 'custom-pic')

      expect(fs.writeFile).toHaveBeenCalledTimes(2)
      expect(fs.writeFile).toHaveBeenNthCalledWith(1, expect.stringContaining('custom-pic1.jpg'), '')
      expect(result).toEqual(['custom-pic1.jpg', 'custom-pic2.jpg'])
    })

    it('debería crear 1 imagen por defecto si no se pasan argumentos', async () => {
      fs.mkdir.mockResolvedValue(true)
      fs.writeFile.mockResolvedValue(true)

      const result = await prepareTestImages() // Sin argumentos

      expect(fs.writeFile).toHaveBeenCalledTimes(1)
      expect(result).toEqual(['image1.jpg'])
    })
  })
})
