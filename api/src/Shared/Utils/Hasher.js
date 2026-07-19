import bcrypt from 'bcryptjs'

export class Hasher {
  static async hash (plainText) {
    return await bcrypt.hash(plainText, 12)
  }

  static async compare (hash, plainText) {
    return await bcrypt.compare(hash, plainText)
  }
}
