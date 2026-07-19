import { describe, it, expect } from 'vitest'
import { Store } from '../helpers/Store.js'

describe('Class Store (test helper)', () => {
  describe('Private fields', () => {
    it('should keep static fields private', () => {
      expect(Store.token).toBeUndefined()
      expect(Store.id).toBeUndefined()
    })
  })
  describe('Token methods', () => {
    it('should save a new token', () => {
      Store.setToken('123456789jjjjj')
      expect(Store.getToken()).toBe('123456789jjjjj')
    })
    it('should overwrite old token', () => {
      Store.setToken('newToken')
      expect(Store.getToken()).toBe('newToken')
    })
  })
  describe('Id methods', () => {
    it('should save a new id', () => {
      Store.setId('123456789jjjjj')
      expect(Store.getId()).toBe('123456789jjjjj')
    })
    it('should save a new numeric id', () => {
      Store.setId(2256)
      expect(Store.getId()).toBe(2256)
    })
  })
})
