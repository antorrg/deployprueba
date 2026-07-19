import { v7 as uuidv7, validate, version } from 'uuid'
export class UuidHandler {
  static idValidator = (value) => {
    const isUUIDv7 = (value) => {
      return validate(value) && version(value) === 7
    }
    if (!isUUIDv7(value)) { throw new Error('User Domain: uuidv7 invalid format') }
    return value
  }

  static idCreator = () => {
    return uuidv7()
  }
}
