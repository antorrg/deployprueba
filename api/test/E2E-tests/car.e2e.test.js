import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../../src/server.js'
import * as db from '../../src/Configs/database.js'
import { seedUsersForE2E } from '../seeds/user.seed.js'
import { seedCarsForE2E } from '../seeds/car.seed.js'
import { loginAs } from '../helpers/auth.helper.js'

describe('Car Routes E2E tests', () => {
  let users = {}
  let cars = {}

  // Credentials and tokens
  let duenoSession = { cookies: '', csrfToken: '', userId: '' }
  let mecanicoSession = { cookies: '', csrfToken: '', userId: '' }
  let usuarioSession = { cookies: '', csrfToken: '', userId: '' }

  beforeAll(async () => {
    // Inicializar BD si corresponde
    if (process.env.TEST_E2E === 'false') {
      await db.startUp(true, true)
    }

    // Correr seeds para popular BD
    users = await seedUsersForE2E()
    cars = await seedCarsForE2E(users)

    // Realizar login de los perfiles operativos
    duenoSession = await loginAs(app, 'dueno@test.com', 'password123')
    mecanicoSession = await loginAs(app, 'mecanico@test.com', 'password123')
    usuarioSession = await loginAs(app, 'usuario@test.com', 'password123')
  })

  afterAll(async () => {
    if (process.env.TEST_E2E === 'false') {
      await db.closedDatabase()
    }
  })

  // ==========================================
  // BLOQUE 1: Tests con Rol "USUARIO"
  // ==========================================
  describe('Permisos de Rol: USUARIO', () => {
    it('GET /car/:carId - Debería poder obtener un vehículo por ID', async () => {
      const targetId = cars['ABC123XX'].id
      const res = await request(app)
        .get(`/car/${targetId}`)
        .set('Cookie', usuarioSession.cookies)

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.patent).toBe('ABC123XX')
    })

    it('GET /car - Debería retornar 403 Forbidden', async () => {
      const res = await request(app)
        .get('/car')
        .set('Cookie', usuarioSession.cookies)

      expect(res.status).toBe(403)
      expect(res.body.message).toMatch(/Faltan permisos/)
    })

    it('POST /car - Debería retornar 403 Forbidden', async () => {
      const res = await request(app)
        .post('/car')
        .set('Cookie', usuarioSession.cookies)
        .set('x-csrf-token', usuarioSession.csrfToken)
        .send({
          userId: users['victima@test.com'].userId,
          patent: 'NNN000NN',
          mark: 'Test',
          model: 'Test'
        })

      expect(res.status).toBe(403)
    })
  })

  // ==========================================
  // BLOQUE 2: Tests con Rol "MECANICO"
  // ==========================================
  describe('Permisos de Rol: MECANICO', () => {
    it('GET /car - Debería poder listar todos los vehículos', async () => {
      const res = await request(app)
        .get('/car')
        .set('Cookie', mecanicoSession.cookies)

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('POST /car - Debería poder registrar un nuevo vehículo', async () => {
      const res = await request(app)
        .post('/car')
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)
        .send({
          userId: users['mecanico@test.com'].userId,
          patent: 'MEC123EC',
          mark: 'Renault',
          model: 'Clio',
          year: '2010'
        })

      expect(res.status).toBe(201)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.patent).toBe('MEC123EC')
    })

    it('PUT /car/:carId - Debería poder editar un vehículo', async () => {
      const targetId = cars['ABC123XX'].id
      const res = await request(app)
        .put(`/car/${targetId}`)
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)
        .send({
          patent: 'ABC123XX',
          mark: 'Toyota Modificado',
          model: 'Corolla',
          year: '2021', // Modificado
          motorNum: 'MOT123456',
          chassisNum: 'CHA123456',
          observations: 'Sin observaciones',
          picture: 'default.jpg'
        })

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.year).toBe('2021')
    })

    it('PATCH /car/:carId/owner - Debería poder cambiar el dueño del vehículo', async () => {
      const targetId = cars['ABC123XX'].id
      const nuevoDuenoId = users['usuario@test.com'].userId

      const res = await request(app)
        .patch(`/car/${targetId}/owner`)
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)
        .send({
          userId: nuevoDuenoId
        })

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.data).toMatch(/Titularidad del veh/i)
    })

    it('DELETE /car/:carId - Debería retornar 403 Forbidden (delete requiere DUENO)', async () => {
      const targetId = cars['ABC123XX'].id
      const res = await request(app)
        .delete(`/car/${targetId}`)
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)

      expect(res.status).toBe(403)
    })
  })

  // ==========================================
  // BLOQUE 3: Tests con Rol "DUENO"
  // ==========================================
  describe('Permisos de Rol: DUENO', () => {
    it('DELETE /car/:carId - Debería poder eliminar un vehículo', async () => {
      const targetId = cars['ABC123XX'].id
      const res = await request(app)
        .delete(`/car/${targetId}`)
        .set('Cookie', duenoSession.cookies)
        .set('x-csrf-token', duenoSession.csrfToken)

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.message).toMatch(/eliminado/i)
    })

    it('GET /car/:carId - El vehículo eliminado ya no debería ser encontrado', async () => {
      const targetId = cars['ABC123XX'].id
      const res = await request(app)
        .get(`/car/${targetId}`)
        .set('Cookie', duenoSession.cookies)

      expect(res.status).toBe(404)
    })
  })
})
