import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import app from '../../src/server.js'
import * as db from '../../src/Configs/database.js'
import { userService } from '../../src/Shared/dependencies.js'

describe('Auth E2E tests', () => {
  beforeAll(async () => {
    if (process.env.TEST_E2E === 'false') {
      await db.startUp(true, true)
    }

    try {
      await userService.registerUser({
        email: 'testauth@example.com',
        passwordRaw: 'password123',
        typeId: 'DNI',
        numberId: 'auth1234'
      })
    } catch (error) {
      console.log('User might already exist (ignoring):', error)
    }
  })

  afterAll(async () => {
    if (process.env.TEST_E2E === 'false') {
      await db.closedDatabase()
    }
  })

  let cookies = []
  let csrfToken = ''

  it('1. GET / - debería inicializar sesión y retornar el csrf token', async () => {
    // Al hacer un GET al server, los middlewares globales de sesión y CSRF deberían inicializarse
    const res = await request(app).get('/csrf-init-test-route-does-not-exist')

    // Guardamos las cookies de sesión y csrf
    const rawCookies = res.headers['set-cookie'] || []
    cookies = rawCookies.map(cookie => cookie.split(';')[0])

    const csrfCookie = rawCookies.find(c => c.startsWith('XSRF-TOKEN='))
    if (csrfCookie) {
      csrfToken = csrfCookie.split(';')[0].split('=')[1]
    }

    // La app devuelve 404 porque la ruta no existe, pero los middlewares ya actuaron
    expect(res.status).toBe(404)
    expect(csrfToken).toBeTruthy()
  })

  it('2. POST /auth/login - debería fallar con credenciales incorrectas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Cookie', cookies.join('; '))
      .set('x-csrf-token', csrfToken)
      .send({ email: 'testauth@example.com', password: 'wrongpassword' })

    expect(res.status).toBe(401)
    expect(res.body.ok).toBe(false)
    expect(res.body.message).toBe('Credenciales inválidas')
  })

  it('3. POST /auth/login - debería hacer login con credenciales correctas', async () => {
    const res = await request(app)
      .post('/auth/login')
      .set('Cookie', cookies.join('; '))
      .set('x-csrf-token', csrfToken)
      .send({ email: 'testauth@example.com', password: 'password123' })

    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.data.email).toBe('testauth@example.com')

    // Actualizamos las cookies con la sesión logueada y cookies nuevas
    const newCookies = res.headers['set-cookie'] || []
    if (newCookies.length > 0) {
      cookies = newCookies.map(c => c.split(';')[0])
    }
  })

  it('4. GET /auth/me - debería retornar la información del usuario logueado', async () => {
    const res = await request(app)
      .get('/auth/me')
      .set('Cookie', cookies.join('; '))

    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.data.email).toBe('testauth@example.com')
  })

  it('5. POST /auth/logout - debería cerrar la sesión del usuario', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .set('Cookie', cookies.join('; '))
      .set('x-csrf-token', csrfToken)
      .send()

    expect(res.status).toBe(200)
    expect(res.body.ok).toBe(true)
    expect(res.body.message).toBe('Sesión cerrada')

    // Verificamos que /auth/me falla después de hacer logout
    const clearedCookies = res.headers['set-cookie'] || []
    const meRes = await request(app)
      .get('/auth/me')
      .set('Cookie', clearedCookies.map(c => c.split(';')[0]).join('; '))

    expect(meRes.status).toBe(401)
    expect(meRes.body.ok).toBe(false)
  })
})
