import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../../src/server.js'
import * as db from '../../src/Configs/database.js'
import { seedUsersForE2E } from '../seeds/user.seed.js'
import { loginAs } from '../helpers/auth.helper.js'

describe('User Routes E2E tests', () => {
  let users = {}

  // Credentials and tokens
  let duenoSession = { cookies: '', csrfToken: '', userId: '' }
  let mecanicoSession = { cookies: '', csrfToken: '', userId: '' }
  let usuarioSession = { cookies: '', csrfToken: '', userId: '' }

  beforeAll(async () => {
    // Si process.env.TEST_E2E es 'false', arrancamos y cerramos la DB aquí
    if (process.env.TEST_E2E === 'false') {
      await db.startUp(true, true)
    }

    // Correr seeds para popular BD con los 4 usuarios
    users = await seedUsersForE2E()

    // Realizar login de los 3 perfiles operativos
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
    it('GET /user/:userId - Debería poder obtener un usuario por ID (su rol lo permite)', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .get(`/user/${targetId}`)
        .set('Cookie', usuarioSession.cookies)

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.email).toBe('victima@test.com')
    })

    it('GET /user - Debería retornar 403 Forbidden', async () => {
      const res = await request(app)
        .get('/user')
        .set('Cookie', usuarioSession.cookies)

      expect(res.status).toBe(403)
      expect(res.body.message).toBe('Faltan permisos para esta accion')
    })

    it('POST /user/create - Debería retornar 403 Forbidden', async () => {
      const res = await request(app)
        .post('/user/create')
        .set('Cookie', usuarioSession.cookies)
        .set('x-csrf-token', usuarioSession.csrfToken)
        .send({
          email: 'nuevo@test.com',
          password: 'password123',
          typeId: 'DNI',
          numberId: '11111'
        })

      expect(res.status).toBe(403)
    })
  })

  // ==========================================
  // BLOQUE 2: Tests con Rol "MECANICO"
  // ==========================================
  describe('Permisos de Rol: MECANICO', () => {
    it('GET /user - Debería poder listar usuarios', async () => {
      const res = await request(app)
        .get('/user')
        .set('Cookie', mecanicoSession.cookies)

      if (res.status !== 200) console.log('GET /user failed:', res.body)
      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(Array.isArray(res.body.data)).toBe(true)
    })

    it('POST /user/create - Debería poder crear un nuevo usuario', async () => {
      const res = await request(app)
        .post('/user/create')
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)
        .send({
          email: 'creadopormecanico@test.com',
          password: 'password123',
          typeId: 'DNI',
          numberId: '99999'
        })

      // El controlador puede devolver 200 o 201 dependiendo de la implementación
      expect([200, 201]).toContain(res.status)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.email).toBe('creadopormecanico@test.com')
    })

    it('PUT /user/:userId - Debería poder editar un perfil', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .put(`/user/${targetId}`)
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)
        .send({
          email: 'victimaeditada@test.com',
          name: 'Nombre Editado',
          nickname: 'victima',
          typeId: 'DNI',
          numberId: '12345678',
          picture: 'http://img.com/a.png'
        })

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.name).toBe('Nombre Editado')
    })

    it('PATCH /user/:userId - Debería retornar 403 Forbidden (upgrade requiere DUENO)', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .patch(`/user/${targetId}`)
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)
        .send({ role: 'ADMIN', enabled: true })

      expect(res.status).toBe(403)
      expect(res.body.message).toMatch(/Accion no permitida|Faltan permisos/)
    })

    it('DELETE /user/:userId - Debería retornar 403 Forbidden (delete requiere DUENO)', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .delete(`/user/${targetId}`)
        .set('Cookie', mecanicoSession.cookies)
        .set('x-csrf-token', mecanicoSession.csrfToken)

      expect(res.status).toBe(403)
    })
  })

  // ==========================================
  // BLOQUE 3: Tests con Rol "DUENO"
  // ==========================================
  describe('Permisos de Rol: DUENO', () => {
    it('PATCH /user/:userId - Debería poder cambiar el rol de un usuario', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .patch(`/user/${targetId}`)
        .set('Cookie', duenoSession.cookies)
        .set('x-csrf-token', duenoSession.csrfToken)
        .send({ role: 'ADMIN', enabled: true })

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
      expect(res.body.data.role).toBe('ADMIN')
    })

    it('DELETE /user/:userId - Debería poder eliminar a un usuario', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .delete(`/user/${targetId}`)
        .set('Cookie', duenoSession.cookies)
        .set('x-csrf-token', duenoSession.csrfToken)

      expect(res.status).toBe(200)
      expect(res.body.ok).toBe(true)
    })

    it('GET /user/:userId - El usuario eliminado ya no debería ser encontrado', async () => {
      const targetId = users['victima@test.com'].userId
      const res = await request(app)
        .get(`/user/${targetId}`)
        .set('Cookie', duenoSession.cookies)

      expect(res.status).toBe(404)
    })
  })
})
