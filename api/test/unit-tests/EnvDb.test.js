import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import * as db from '../../src/Configs/database.js'
import envConfig from '../../src/Configs/envConfig.js'

// Colocar aqui el nombre de la db de tests:
const dbTestingName='testing'

describe('Environment variables', () => {
  it('should return the correct environment status and database variable', () => {
    const formatEnvInfo = `Servidor corriendo en: ${envConfig.Status}\n` +
                   `Base de datos de testing: ${db.dbName}`
    expect(formatEnvInfo).toBe('Servidor corriendo en: test\n' +
        `Base de datos de testing: ${dbTestingName}`)
  })
})
describe('Database existence', () => {
  beforeAll(async () => {
    await db.startUp(true, true)
  })
  afterAll(async () => {
    await db.closedDatabase()
  })
  it('should query tables and return an empty array', async () => {
    const models = [
      db.Car, 
      db.Category, 
      db.CategoryImg, 
      db.CategoryPost, 
      db.CategoryProvider, 
      db.Commerce, 
      db.ImagesConfig, 
      db.Post, 
      db.Product, 
      db.Provider, 
      db.Province, 
      db.Service, 
      db.Test, 
      db.User
    ]
    for (const model of models) {
      const records = await model.findAll()
      expect(Array.isArray(records)).toBe(true)
      expect(records.length).toBe(0)
    }
  })
})
