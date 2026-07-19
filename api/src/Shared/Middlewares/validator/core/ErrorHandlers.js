export class ErrorHandlers {
  static expressError (message, status) {
    const error = new Error(message)
    error.status = status ?? 400
    error.contexts = ['Middleware error:']
    return error
  }
}
