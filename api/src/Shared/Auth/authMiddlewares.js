import { middError } from '../../Configs/errorHandlers.js'
import { CSRF } from './CSRF.js'

const csrfTokens = new CSRF({ saltLength: 8, secretLength: 18 })

export const UserRole = {
  DUENO: 'DUENO',
  ADMIN: 'ADMIN',
  MECANICO: 'MECANICO',
  USUARIO: 'USUARIO'
}

export const RoleHierarchy = {
  [UserRole.USUARIO]: 1,
  [UserRole.MECANICO]: 2,
  [UserRole.ADMIN]: 3,
  [UserRole.DUENO]: 4
}

// Genera el secreto en sesión (si no existe) y escribe el token en la cookie XSRF-TOKEN.
// Equivalente a csurf({ cookie: true }) + el setCsrfToken que había antes.
export const csrfProtection = (req, res, next) => {
  // Inicializar el secreto en sesión la primera vez
  if (!req.session.csrfSecret) {
    req.session.csrfSecret = csrfTokens.secretSync()
    req.session.save((err) => {
      if (err) return next(middError('No se pudo inicializar la sesión CSRF', 401))
      next()
    })
    return
  }
  next()
}

// Expone el token CSRF en la cookie XSRF-TOKEN (legible por JS del cliente, sin httpOnly).
// El cliente lo lee y lo envía como header 'x-csrf-token' en cada petición mutante.
export const setCsrfToken = (req, res, next) => {
  const secret = req.session.csrfSecret
  const token = csrfTokens.create(secret)
  res.cookie('XSRF-TOKEN', token, {
    httpOnly: false, // debe ser legible por el cliente
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax'
  })
  next()
}

// Verifica el token CSRF en métodos mutantes (POST, PUT, PATCH, DELETE).
// Lee el token desde header 'x-csrf-token', 'csrf-token' o body '_csrf'.
// Equivalente a la verificación interna que hacía csurf.
export const verifyCsrfToken = (req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next()
  }

  const secret = req.session.csrfSecret
  if (!secret) {
    return next(middError('CSRF: sesión sin secreto', 401))
  }

  const token =
    req.headers['x-csrf-token'] ||
    req.headers['csrf-token'] ||
    req.body?._csrf ||
    req.query._csrf

  if (!csrfTokens.verify(secret, token)) {
    return next(middError('Token CSRF inválido', 401))
  }

  next()
}

export const isAuthenticated = (req, res, next) => {
  const sessionUser = req.session.user
  if (!sessionUser) return next(middError('No autenticado', 401))
  next()
}

// RBAC
export const authorize =
  (...allowedRoles) => // []
    (req, res, next) => {
      const user = req.session.user
      if (!user) return next(middError('No autenticado', 401))

      if (!allowedRoles.includes(user.role)) {
        return next(middError('Accion no permitida', 403))
      }

      next()
    }
// src/middlewares/authorize.ts

export const authorizeMinRole =
  (minimumRole) =>
    (req, res, next) => {
      const sessionUser = req.session.user

      if (!sessionUser) {
        return next(middError('No autenticado', 401))
      }

      const userLevel = RoleHierarchy[sessionUser.role]
      const requiredLevel = RoleHierarchy[minimumRole]

      if (userLevel < requiredLevel) {
        return next(middError('Faltan permisos para esta accion', 403))
      }

      next()
    }

export class Auth {
  static login (req, user) { // user = {id, email, role}
    req.session.user = user
    // No es estrictamente necesario en producción pero ayuda en tests asíncronos
    req.session.save()
  }

  static logout (req) {
    return new Promise((resolve, reject) => {
      req.session.destroy((err) => {
        if (err) reject(err)
        else resolve()
      })
    })
  }

  static getSessionUser (req) {
    return req.session?.user ?? null
  }
}
