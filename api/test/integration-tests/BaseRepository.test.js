import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { BaseRepository } from '../../src/Shared/Repositories/BaseRepository.js'
import * as db from '../../src/Configs/database.js'

describe('BaseRepository Integration test ', () => {
  beforeAll(async () => {
    await db.startUp(true, true)
  })
  afterAll(async () => {
    await db.closedDatabase()
  })
  const testRepository = new BaseRepository(db.Test, testParser, 'Test', 'idTest')
  describe('create method', () => {
    it('should create an element', async () => {
      const data = { title: 'An element for db', enabled: true }
      const test = await testRepository.create(data)
      expect(test).toEqual({
        testId: 1,
        title: 'An element for db',
        enabled: true
      })
    })
    describe('update method', () => {
      it('should update an element', async () => {
        const data = { title: 'updated element' }
        const test = await testRepository.update(1, data)
        expect(test).toEqual({
          testId: 1,
          title: 'updated element',
          enabled: true
        })
      })
      it('should throw an error if id is not correct', async () => {
        try {
          const data = { title: 'updated element' }
          await testRepository.update(3, data)
          throw new Error('Should throw an error but nothing happens')
        } catch (error) {
          expect(error).toBeInstanceOf(Error)
          expect(error.message).toBe('Register not found')
          expect(error.status).toBe(404)
          expect(error.contexts).toEqual(['Test method "update"'])
        }
      })
      describe('getAll method', () => {
        it('should retrieve an array of elements', async () => {
          const test = await testRepository.getAll()
          expect(test).toEqual([{
            testId: 1,
            title: 'updated element',
            enabled: true
          }])
        })
      })
      describe('getById method', () => {
        it('should retrieve an element', async () => {
          const id = 1
          const test = await testRepository.getById(id)
          expect(test).toEqual({
            testId: 1,
            title: 'updated element',
            enabled: true
          })
        })
        it('should throw an error if id is not correct', async () => {
          try {
            const id = 4
            await testRepository.getById(id)
            throw new Error('Should throw an error but nothing happens')
          } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('Register not found')
            expect(error.status).toBe(404)
            expect(error.contexts).toEqual(['Test method "getById"'])
          }
        })
      })
      describe('delete method', () => {
        it('should throw an error if id is not correct', async () => {
          try {
            const id = 4
            await testRepository.delete(id)
            throw new Error('Should throw an error but nothing happens')
          } catch (error) {
            expect(error).toBeInstanceOf(Error)
            expect(error.message).toBe('Register not found')
            expect(error.status).toBe(404)
            expect(error.contexts).toEqual(['Test method "delete"'])
          }
        })
        it('should delete an element', async () => {
          const id = 1
          const test = await testRepository.delete(id)
          const verify = await testRepository.getAll()
          expect(test).toBe(true)
          expect(verify.length).toBe(0)
        })
      })
    })
  })
})
function testParser (value) {
  return {
    testId: value.testId,
    title: value.title,
    enabled: value.enabled
  }
}
