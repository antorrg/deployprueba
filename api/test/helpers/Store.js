export class Store {
  static #token = ''
  static #id = null

  static setToken (value) {
    this.#token = value
  }

  static getToken () {
    return this.#token
  }

  static setId (value) {
    this.#id = value
  }

  static getId () {
    return this.#id
  }
}
