import envConfig from './envConfig.js'

class CustomError extends Error {
  constructor (log = false) {
    super()
    this.log = log
  }

  throwError = (message, status) => {
    const error = new Error(message)
    error.status = status ?? 500
    error.context = []
    throw error
  }

  processError = (err, contextMessage) => {
    let normalized

    if (err instanceof Error) {
    // ya es un Error
      normalized = err
      normalized.status = normalized.status ?? 500
      normalized.contexts = Array.isArray(normalized.contexts) ? normalized.contexts : []
    } else {
    // no es Error → lo convierto
      normalized = {
        name: 'UnknownError',
        message: String(err),
        status: 500,
        contexts: []
      }
    }

    // evitar duplicados de contexto
    const last = normalized.contexts[normalized.contexts.length - 1]
    if (!last || last !== contextMessage) normalized.contexts.push(contextMessage)

    throw normalized
  }
}

const errorHandler = new CustomError(false)

export const middError = (message, status) => {
  const error = new Error(message)
  error.status = status
  error.contexts = ['Middleware error:']
  return error
}
export const throwError = errorHandler.throwError

export const processError = errorHandler.processError

export const errorEndWare = (err, req, res, next) => {
  let data
  const status = err.status || 500
  const message = err.message || 'Internal server error'
  Array.isArray(err.contexts) ? err.contexts : ['Unhandled error']
  if (envConfig.Status !== 'production') {
    data = err.contexts
  } else data = ''
  //console.error('el error para ver: ', err)
  res.status(status).json({
    ok: false,
    message,
    data
  })
}

export const jsonFormat = (err, req, res, next) => {
  if (err instanceof SyntaxError && 'status' in err && err.status === 400 && 'body' in err) {
    res.status(400).json({ error: 'Invalid JSON format' })
  } else {
    next()
  }
}
export const reqLogger = (req, res, next) => {
  console.log('HEADERS:', req.headers)
  console.log('METHOD:', req.method)
  console.log('URL:', req.url)
  next()
}

export const notFoundRoute = (req, res, next) => {
  next(middError('Not Found', 404))
}
