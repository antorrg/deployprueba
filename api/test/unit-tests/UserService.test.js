import { describe, it, expect, beforeEach, vi } from 'vitest'
import { UserService } from '../../src/Features/user/UserService.js'
import { User } from '../../src/Features/user/User.js'

import { Hasher as hasher } from '../../src/Shared/Utils/Hasher.js'
import { generatePassword } from '../../src/Features/user/generateNewPassword.js'
import { UuidHandler } from '../../src/Shared/Utils/UuidHandler.js'

// ─── Mocks ────────────────────────────────────────────────────────────────────

vi.mock('../../src/Shared/Utils/Hasher.js', () => ({
  Hasher: { hash: vi.fn(), compare: vi.fn() }
}))

vi.mock('../../src/Features/user/generateNewPassword.js', () => ({
  generatePassword: vi.fn()
}))

// ─── Helper ───────────────────────────────────────────────────────────────────

const VALID_HASH = '$2b$10$abcdefghijklmnopqrstu' // >= 20 chars

// UUIDv7 generado una vez — válido para el dominio
const TEST_ID = UuidHandler.idCreator()

function makeUser (overrides = {}) {
  return new User({
    userId: TEST_ID,
    email: 'user@test.com',
    password: VALID_HASH,
    typeId: 'DNI',
    numberId: '12345678',
    role: 'USUARIO',
    name: 'Test User',
    nickname: 'testuser',
    picture: 'https://res.cloudinary.com/demo/image/upload/sample.jpg',
    enabled: true,
    ...overrides
  })
}

// ─── Setup ────────────────────────────────────────────────────────────────────

const mockRepo = {
  save: vi.fn(),
  update: vi.fn(),
  getById: vi.fn(),
  getAll: vi.fn(),
  getByIdPublic: vi.fn(),
  delete: vi.fn(),
  findByEmail: vi.fn(),
  getAllEnabled: vi.fn(),
  getByIdEnabled: vi.fn()
}

const mockHandleSingleReuse = vi.fn()
const mockSyncImageOnUpdate = vi.fn()
const mockNotifier = vi.fn()

function makeService () {
  return new UserService(
    mockRepo,
    mockHandleSingleReuse,
    mockSyncImageOnUpdate,
    mockNotifier
  )
}

// ─── Tests ────────────────────────────────────────────────────────────────────

describe('UserService', () => {
  let service
  let user

  beforeEach(() => {
    vi.clearAllMocks()
    user = makeUser()
    service = makeService()
  })

  // ── registerUser ─────────────────────────────────────────────────────────────

  describe('registerUser', () => {
    it('hashea la contraseña, guarda el usuario y retorna el DTO', async () => {
      vi.mocked(hasher.hash).mockResolvedValue(VALID_HASH)
      mockRepo.save.mockResolvedValue(undefined)

      const result = await service.registerUser({ email: 'new@test.com', passwordRaw: 'rawPass', typeId: 'DNI', numberId: '12345678' })

      expect(hasher.hash).toHaveBeenCalledWith('rawPass')
      expect(mockRepo.save).toHaveBeenCalledOnce()
      expect(result).toMatchObject({ email: 'new@test.com', role: 'USUARIO', enabled: true })
      expect(result).not.toHaveProperty('password')
    })
  })

  // ── changePassword ───────────────────────────────────────────────────────────

  describe('changePassword', () => {
    it('cambia la contraseña correctamente', async () => {
      vi.mocked(hasher.compare).mockResolvedValue(true)
      vi.mocked(hasher.hash).mockResolvedValue(VALID_HASH)
      mockRepo.getById.mockResolvedValue(user)
      mockRepo.update.mockResolvedValue(user)

      const result = await service.changePassword(user.toDTO().userId, 'old', 'new')

      expect(hasher.compare).toHaveBeenCalledOnce()
      expect(mockRepo.update).toHaveBeenCalledOnce()
      expect(result).not.toHaveProperty('password')
    })

    it('lanza NOT_FOUND si el usuario no existe', async () => {
      mockRepo.getById.mockResolvedValue(null)
      await expect(service.changePassword('bad', 'old', 'new'))
        .rejects.toMatchObject({ status: 404 })
    })

    it('lanza INVALID_INPUT con contraseña incorrecta', async () => {
      vi.mocked(hasher.compare).mockResolvedValue(false)
      mockRepo.getById.mockResolvedValue(user)
      await expect(service.changePassword(user.toDTO().userId, 'wrong', 'new'))
        .rejects.toMatchObject({ status: 400 })
    })

    it('lanza ACCESS_DENIED si el usuario es DUENO', async () => {
      mockRepo.getById.mockResolvedValue(makeUser({ role: 'DUENO' }))
      await expect(service.changePassword(user.toDTO().userId, 'old', 'new'))
        .rejects.toMatchObject({ status: 403 })
    })
  })

  // ── resetPassword ────────────────────────────────────────────────────────────

  describe('resetPassword', () => {
    it('genera contraseña, invoca el notifier y actualiza el usuario', async () => {
      vi.mocked(generatePassword).mockReturnValue('NewPass123!abc')
      vi.mocked(hasher.hash).mockResolvedValue(VALID_HASH)
      mockNotifier.mockResolvedValue(undefined)
      mockRepo.getById.mockResolvedValue(user)
      mockRepo.update.mockResolvedValue(user)

      await service.resetPassword(user.toDTO().userId)

      expect(generatePassword).toHaveBeenCalledOnce()
      expect(mockNotifier).toHaveBeenCalledWith('user@test.com', 'NewPass123!abc')
      expect(mockRepo.update).toHaveBeenCalledOnce()
    })

    it('lanza NOT_FOUND si el usuario no existe', async () => {
      mockRepo.getById.mockResolvedValue(null)
      await expect(service.resetPassword('bad'))
        .rejects.toMatchObject({ status: 404 })
    })

    it('lanza ACCESS_DENIED si el usuario es DUENO', async () => {
      mockRepo.getById.mockResolvedValue(makeUser({ role: 'DUENO' }))
      await expect(service.resetPassword(user.toDTO().userId))
        .rejects.toMatchObject({ status: 403 })
    })
  })

  // ── disableUser ──────────────────────────────────────────────────────────────

  describe('disableUser', () => {
    it('deshabilita al usuario', async () => {
      mockRepo.getById.mockResolvedValue(user)
      mockRepo.update.mockResolvedValue(makeUser({ enabled: false }))

      const result = await service.disableUser(user.toDTO().userId)

      expect(mockRepo.update).toHaveBeenCalledOnce()
      expect(result.enabled).toBe(false)
    })

    it('lanza NOT_FOUND si el usuario no existe', async () => {
      mockRepo.getById.mockResolvedValue(null)
      await expect(service.disableUser('bad')).rejects.toMatchObject({ status: 404 })
    })

    it('lanza ACCESS_DENIED si el usuario es DUENO', async () => {
      mockRepo.getById.mockResolvedValue(makeUser({ role: 'DUENO' }))
      await expect(service.disableUser(user.toDTO().userId))
        .rejects.toMatchObject({ status: 403 })
    })
  })

  // ── enableUser ───────────────────────────────────────────────────────────────

  describe('enableUser', () => {
    it('habilita al usuario', async () => {
      mockRepo.getById.mockResolvedValue(makeUser({ enabled: false }))
      mockRepo.update.mockResolvedValue(user)

      const result = await service.enableUser(user.toDTO().userId)

      expect(result.enabled).toBe(true)
    })

    it('lanza NOT_FOUND si el usuario no existe', async () => {
      mockRepo.getById.mockResolvedValue(null)
      await expect(service.enableUser('bad')).rejects.toMatchObject({ status: 404 })
    })
  })

  // ── changeRoleUser ───────────────────────────────────────────────────────────

  describe('changeRoleUser', () => {
    it('cambia el rol correctamente', async () => {
      mockRepo.getById.mockResolvedValue(user)
      mockRepo.update.mockResolvedValue(makeUser({ role: 'ADMIN' }))

      const result = await service.changeRoleUser(user.toDTO().userId, 'ADMIN')

      expect(result.role).toBe('ADMIN')
    })

    it('lanza ROLE_NOT_ALLOWED para rol inválido', async () => {
      await expect(service.changeRoleUser(user.toDTO().userId, 'SUPERUSUARIO'))
        .rejects.toMatchObject({ status: 400 })
    })

    it('lanza ACCESS_DENIED si el usuario objetivo es DUENO', async () => {
      mockRepo.getById.mockResolvedValue(makeUser({ role: 'DUENO' }))
      await expect(service.changeRoleUser(user.toDTO().userId, 'ADMIN'))
        .rejects.toMatchObject({ status: 403 })
    })
  })

  // ── deleteUser ───────────────────────────────────────────────────────────────

  describe('deleteUser', () => {
    it('elimina el usuario y sincroniza la imagen', async () => {
      mockRepo.getById.mockResolvedValue(user)
      mockRepo.delete.mockResolvedValue(undefined)
      mockSyncImageOnUpdate.mockResolvedValue(undefined)

      const result = await service.deleteUser(user.toDTO().userId)

      expect(mockRepo.delete).toHaveBeenCalledOnce()
      expect(mockSyncImageOnUpdate).toHaveBeenCalledOnce()
      expect(result).toContain('user@test.com')
    })

    it('lanza NOT_FOUND si el usuario no existe', async () => {
      mockRepo.getById.mockResolvedValue(null)
      await expect(service.deleteUser('bad')).rejects.toMatchObject({ status: 404 })
    })

    it('lanza ACCESS_DENIED si el usuario es DUENO', async () => {
      mockRepo.getById.mockResolvedValue(makeUser({ role: 'DUENO' }))
      await expect(service.deleteUser(user.toDTO().userId))
        .rejects.toMatchObject({ status: 403 })
    })
  })

  // ── login ─────────────────────────────────────────────────────────────────────

  describe('login', () => {
    it('retorna el DTO con credenciales correctas', async () => {
      vi.mocked(hasher.compare).mockResolvedValue(true)
      mockRepo.findByEmail.mockResolvedValue(user)

      const result = await service.login('user@test.com', 'pass')

      expect(result).toMatchObject({ email: 'user@test.com', enabled: true })
      expect(result).not.toHaveProperty('password')
    })

    it('lanza ACCESS_DENIED si el usuario no existe', async () => {
      mockRepo.findByEmail.mockResolvedValue(null)
      await expect(service.login('noone@test.com', 'pass'))
        .rejects.toMatchObject({ status: 401 })
    })

    it('lanza ACCESS_DENIED si el usuario está deshabilitado', async () => {
      mockRepo.findByEmail.mockResolvedValue(makeUser({ enabled: false }))
      await expect(service.login('user@test.com', 'pass'))
        .rejects.toMatchObject({ status: 401 })
    })

    it('lanza INVALID_INPUT con contraseña incorrecta', async () => {
      vi.mocked(hasher.compare).mockResolvedValue(false)
      mockRepo.findByEmail.mockResolvedValue(user)
      await expect(service.login('user@test.com', 'wrong'))
        .rejects.toMatchObject({ status: 400 })
    })
  })

  // ── getAllUsers ───────────────────────────────────────────────────────────────

  describe('getAllUsers', () => {
    it('retorna la lista mapeada sin campo password', async () => {
      mockRepo.getAll.mockResolvedValue([user])

      const result = await service.getAllUsers()

      expect(result).toHaveLength(1)
      expect(result[0]).toMatchObject({ email: 'user@test.com' })
      expect(result[0]).not.toHaveProperty('password')
    })
  })

  // ── getUserById ───────────────────────────────────────────────────────────────

  describe('getUserById', () => {
    it('delega en el repositorio y retorna el resultado', async () => {
      const dto = user.toDTO()
      mockRepo.getByIdPublic.mockResolvedValue(dto)

      const result = await service.getUserById(user.toDTO().userId)

      expect(mockRepo.getByIdPublic).toHaveBeenCalledWith(user.toDTO().userId)
      expect(result).toEqual(dto)
    })
  })
})
