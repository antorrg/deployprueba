import request from 'supertest'

/**
 * Realiza un login simulado para obtener las cookies y el CSRF token necesarios para peticiones E2E.
 *
 * @param {Object} app - Instancia de la app Express
 * @param {string} email - Correo del usuario
 * @param {string} password - Contraseña
 * @returns {Promise<{ cookies: string, csrfToken: string, userId: string }>}
 */
export async function loginAs (app, email, password) {
  // 1. Obtener token CSRF inicializando la sesión
  const initRes = await request(app).get('/csrf-init')
  const rawInitCookies = initRes.headers['set-cookie'] || []
  let cookiesList = rawInitCookies.map(cookie => cookie.split(';')[0])

  const csrfCookie = rawInitCookies.find(c => c.startsWith('XSRF-TOKEN='))
  let csrfToken = ''
  if (csrfCookie) {
    csrfToken = csrfCookie.split(';')[0].split('=')[1]
  }

  // 2. Ejecutar Login
  const res = await request(app)
    .post('/auth/login')
    .set('Cookie', cookiesList.join('; '))
    .set('x-csrf-token', csrfToken)
    .send({ email, password })

  if (res.status !== 200) {
    throw new Error(`Login falló para ${email}: ${res.body.message || res.status}`)
  }

  // 3. Actualizar cookies con la sesión ya logueada
  const rawCookies = res.headers['set-cookie'] || []
  if (rawCookies.length > 0) {
    cookiesList = rawCookies.map(c => c.split(';')[0])
  }

  return {
    cookies: cookiesList.join('; '),
    csrfToken,
    userId: res.body.data?.id
  }
}
