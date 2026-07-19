import { config } from 'dotenv'

const ENV_FILES = {
  production: '.env',
  development: '.env.development',
  test: '.env.test'
}
const NODE_ENV = process.env.NODE_ENV ?? 'production'

config({ path: ENV_FILES[NODE_ENV] })

function getNumberEnv (value) {
  const key = process.env[value]
  if (!key) { throw new Error(`The value for "${value}" is required`) }
  return parseInt(key)
}

function getStringEnv (value) {
  const key = process.env[value]
  if (!key) { throw new Error(`The value for "${value}" is required`) }
  return key
}

export default {
  Port: getNumberEnv('PORT'),
  Status: process.env.NODE_ENV,
  DatabaseUrl: getStringEnv('DATABASE_URL'),
  UserImg: getStringEnv('USER_IMAGE'),
  SessionSecret: getStringEnv('SESSION_SECRET'),
  DefaultPass: getStringEnv('DEFAULT_PASS'),
  DefaultImgCar: getStringEnv('DEFAULT_IMG_VEHICULO'),
  RootEmail: getStringEnv('EMAIL'),
  RootPass: getStringEnv('PASS'),
  RootImg: getStringEnv('IMG'),
  TestImagesUploadDir: getStringEnv('IMAGES_UPLOAD_DIR')
}
