import { describe, it, expect, beforeEach } from 'vitest'
import { User } from '../../src/Features/user/User.js'

describe('User Domain Entity', () => {
  // Datos base para pruebas
  const validEmail = 'test@example.com'
  const validPasswordHash = '$2b$10$unHashValidoDePrueba1234567890' // Mayor a 20 chars

  describe('1. Instanciación y Creación (Factory)', () => {
    it('debe registrar un usuario correctamente con User.register', () => {
      const user = User.register({
        email: validEmail,
        hashedPassword: validPasswordHash,
        typeId: 'DNI',
        numberId: '22445789'
      })

      const dto = user.toDTO()

      expect(dto.userId).toBeDefined()
      expect(dto.email).toBe(validEmail)
      expect(dto.role).toBe('USUARIO')
      expect(dto.name).toBe('Falta completar')
      expect(dto.nickname).toBe('test') // Extraído del email test@example.com
      expect(dto.enabled).toBe(true)
    })

    it('debe lanzar error si faltan datos en User.register', () => {
      expect(() => {
        User.register({ email: '', hashedPassword: validPasswordHash })
      }).toThrow()

      expect(() => {
        User.register({ email: validEmail, hashedPassword: '' })
      }).toThrow()
    })
  })

  describe('2. Métodos de Cambio de Estado (Domain Behaviors)', () => {
    let user

    beforeEach(() => {
      user = User.register({
        email: validEmail,
        hashedPassword: validPasswordHash,
        typeId: 'DNI',
        numberId: '22445789'
      })
    })

    it('debe deshabilitar y habilitar al usuario', () => {
      expect(user.toDTO().enabled).toBe(true)

      user.disableUser()
      expect(user.toDTO().enabled).toBe(false)

      user.enabledUser()
      expect(user.toDTO().enabled).toBe(true)
    })

    it('debe cambiar la contraseña si el hash es válido', () => {
      const newHash = '$2b$10$otroHashValidoDePrueba0987654321'
      user.changePassword(newHash)

      const persistence = user.toPersistence()
      expect(persistence.password).toBe(newHash)
    })

    it('debe lanzar error si el nuevo hash de contraseña es inválido', () => {
      expect(() => {
        user.changePassword('corta') // Falla porque es menor a 20 caracteres
      }).toThrow()
    })

    it('debe actualizar el perfil correctamente', () => {
      user.updateProfile({
        email: 'nuevo@example.com',
        name: 'Juan Perez',
        picture: 'imagen',
        nickname: 'juanp'
      })

      const dto = user.toDTO()
      expect(dto.email).toBe('nuevo@example.com')
      expect(dto.name).toBe('Juan Perez')
      expect(dto.nickname).toBe('juanp')
    })

    it('debe cambiar el rol si es válido', () => {
      user.changeRole('ADMIN')
      expect(user.toDTO().role).toBe('ADMIN')

      expect(() => {
        user.changeRole('HACKER') // Asumiendo que HACKER no es un rol válido en tu enum
      }).toThrow()
    })
  })

  describe('3. Mapeos (toDTO y toPersistence)', () => {
    it('toDTO no debe exponer la contraseña', () => {
      const user = User.register({
        email: validEmail,
        hashedPassword: validPasswordHash,
        typeId: 'DNI',
        numberId: '22445789'
      })

      const dto = user.toDTO()
      expect(dto.password).toBeUndefined()
      expect(dto.email).toBe(validEmail)
    })

    it('toPersistence debe devolver todos los datos requeridos por Postgres', () => {
      const user = User.register({
        email: validEmail,
        hashedPassword: validPasswordHash,
        typeId: 'DNI',
        numberId: '22445789'
      })

      const dbRecord = user.toPersistence()
      expect(dbRecord.userId).toBeDefined()
      expect(dbRecord.password).toBe(validPasswordHash)
      expect(dbRecord.email).toBe(validEmail)
      expect(dbRecord.role).toBe('USUARIO')
      expect(dbRecord.enabled).toBe(true)
    })
  })
})
