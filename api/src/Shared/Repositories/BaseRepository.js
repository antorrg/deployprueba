import * as eh from '../../Configs/errorHandlers.js'

export class BaseRepository {
  constructor (Model, parser = null, tableName) {
    if (parser !== null && typeof (parser) !== 'function') { throw new Error('Parser function is required') }
    this.Model = Model
    this.parser = parser
    this.tableName = tableName
  }

  async create (data) {
    try {
      const register = await this.Model.create(data)
      if (!register) { eh.throwError(`Error creating ${this.Model.name}`, 500) }
      return this.parser ? this.parser(register) : register
    } catch (error) {
      eh.processError(error, `${this.tableName} method "create"`)
      throw error
    }
  }

  async update (id, data) {
    try {
      const register = await this.Model.findByPk(id)
      if (!register) { eh.throwError('Register not found', 404) }
      const updated = await register.update(data)
      return this.parser ? this.parser(updated) : updated
    } catch (error) {
      eh.processError(error, `${this.tableName} method "update"`)
      throw error
    }
  }

  async delete (id) {
    try {
      const register = await this.Model.findByPk(id)
      if (!register) { eh.throwError('Register not found', 404) }
      await register.destroy()
      return true
    } catch (error) {
      eh.processError(error, `${this.tableName} method "delete"`)
      throw error
    }
  }

  async getAll () {
    const registers = await this.Model.findAll()
    return this.parser ? registers.map(r => this.parser(r)) : registers
  }

  async getById (id) {
    try {
      const register = await this.Model.findByPk(id)
      if (!register) { eh.throwError('Register not found', 404) }
      return this.parser ? this.parser(register) : register
    } catch (error) {
      eh.processError(error, `${this.tableName} method "getById"`)
      throw error
    }
  }
}
