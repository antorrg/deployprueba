import { AuxValid } from './core/auxValid.js'
import { ValidationEngine } from './core/ValidationEngine.js'
import { ErrorHandlers } from './core/ErrorHandlers.js'
export class Validator {
  static validateBody (schema, maxDepth = 10) {
    return (req, res, next) => {
      try {
        const validated = ValidationEngine.validateStructure(req.body, schema, undefined, maxDepth)
        req.body = validated
        next()
      } catch (err) {
        return next(ErrorHandlers.expressError(err.message, 400))
      }
    }
  }

  static validateQuery (schema, rules = {}, maxDepth = 5) {
    return (req, res, next) => {
      try {
        const validated = ValidationEngine.validateStructure(req.query, schema, undefined, maxDepth)
        ValidationEngine.allowedValuesByRules(validated, rules)
        req.context = req.context || {}
        req.context.query = validated
        next()
      } catch (err) {
        return next(ErrorHandlers.expressError(err.message, 400))
      }
    }
  }

  static validateHeaders (schema, maxDepth = 3) {
    return (req, res, next) => {
      try {
        const headers = req.headers || {}
        const contentType = headers['content-type']
        if (!contentType) { throw new Error('Missing required header: content-type') }
        const lowerContentType = contentType.toLowerCase()
        if (lowerContentType !== 'application/json' &&
                    !lowerContentType.startsWith('multipart/form-data')) {
          throw new Error('Invalid Content-Type header')
        }
        const validated = schema
          ? ValidationEngine.validateStructure(headers, schema, 'headers', maxDepth)
          : { 'content-type': contentType }
        req.context = req.context || {}
        req.context.headers = validated
        next()
      } catch (err) {
        return next(ErrorHandlers.expressError(err.message, 400))
      }
    }
  }

  static validateRegex (validRegex, nameOfField, message) {
    return (req, res, next) => {
      if (!validRegex || !nameOfField || nameOfField.trim() === '') {
        return next(ErrorHandlers.expressError('Missing parameters in function!', 400))
      }
      const field = req.body[nameOfField]
      const personalizedMessage = message ? ' ' + message : ''
      if (!field || typeof field !== 'string' || field.trim() === '') {
        return next(ErrorHandlers.expressError(`Missing ${nameOfField}`, 400))
      }
      if (!validRegex.test(field)) {
        return next(ErrorHandlers.expressError(`Invalid ${nameOfField} format!${personalizedMessage}`, 400))
      }
      next()
    }
  }

  static paramId (fieldName, validator) {
    return (req, res, next) => {
      const id = req.params[fieldName]
      if (!id) {
        next(ErrorHandlers.expressError(`Missing ${fieldName}`, 400))
        return
      }
      const isValid = typeof validator === 'function' ? validator(id) : validator.test(id)
      if (!isValid) {
        next(ErrorHandlers.expressError('Invalid parameters', 400))
        return
      }
      next()
    }
  }

  static ValidReg = AuxValid.ValidReg
}
