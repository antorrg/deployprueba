export class AuxValid {
  static ValidReg = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[A-Z]).{8,}$/,
    UUIDv4: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    UUIDall: /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/,
    INT: /^\d+$/, // Solo enteros positivos
    OBJECT_ID: /^[0-9a-fA-F]{24}$/, // ObjectId de MongoDB
    FIREBASE_ID: /^[A-Za-z0-9_-]{20}$/ // Firebase push ID
  }

  static splitObjectProps (obj, propsToExtract = []) {
    const { rest, extracted } = Object.entries(obj).reduce((acc, [key, value]) => {
      const k = key
      if (propsToExtract.includes(k)) { acc.extracted[k] = value } else { acc.rest[key] = value }
      return acc
    }, { rest: {}, extracted: {} })
    return { rest, ...extracted }
  }

  static #validateBoolean (value) {
    if (typeof value === 'boolean') { return value }
    if (value === 'true') { return true }
    if (value === 'false') { return false }
    throw new Error('Invalid boolean value')
  }

  static #validateInt (value) {
    const intValue = Number(value)
    if (isNaN(intValue) || !Number.isInteger(intValue)) { throw new Error('Invalid integer value') }
    return intValue
  }

  static #validateFloat (value) {
    const floatValue = parseFloat(value)
    if (isNaN(floatValue)) { throw new Error('Invalid float value') }
    return floatValue
  }

  static #escapeHTML (str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\//g, '&#x2F;')
      .replace(/\\/g, '&#x5C;')
      .replace(/`/g, '&#96;')
  }

  static #trimString (str) {
    return String(str).trim()
  }

  static validateValue (value, fieldType, fieldName, itemIndex, sanitize) {
    const indexInfo = itemIndex !== null ? ` in item[${itemIndex}]` : ''
    if (typeof value === 'object') {
      if (value instanceof String || value instanceof Number || value instanceof Boolean) {
        value = value.valueOf()
      }
    }
    switch (fieldType) {
      case 'boolean':
        return AuxValid.#validateBoolean(value)
      case 'int':
        return AuxValid.#validateInt(value)
      case 'float':
        return AuxValid.#validateFloat(value)
      case 'array':
        if (!Array.isArray(value)) {
          throw new Error(`Invalid array value for field ${fieldName}${indexInfo}`)
        }
        return value
      case 'string':
      default:
        if (typeof value !== 'string') {
          throw new Error(`Invalid string value for field ${fieldName}${indexInfo}`)
        }
        if (sanitize) {
          if (sanitize.trim) { value = AuxValid.#trimString(value) }
          if (sanitize.escape) { value = AuxValid.#escapeHTML(value) }
          if (sanitize.lowercase) { value = value.toLowerCase() }
          if (sanitize.uppercase) { value = value.toUpperCase() }
        }
        return value
    }
  }
}
