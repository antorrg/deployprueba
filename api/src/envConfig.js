import {config} from 'dotenv'
const ENV_FILES = {
    production: '.env',
    development: '.env.development',
    test: '.env.test'
}
const NODE_ENV = process.env.NODE_ENV ?? 'production'

config({path: ENV_FILES[NODE_ENV]})

const {PORT, DB_USER, DB_PASS, DB_HOST,DB_NAME, DATABASE_URL, USER_IMAGE, SECRET_KEY, DEFAULT_PASS, DEFAULT_IMG_VEHICULO, EMAIL, PASS, IMG, }=process.env;
const localDB = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

export default {
    Port: PORT,
    Status: process.env.NODE_ENV==='production'? 'production' :  process.env.NODE_ENV==='development'?'development' : 'testing',
    ConnectDB : DATABASE_URL,
    UserImg: USER_IMAGE,
    SecretKey : SECRET_KEY,
    DefaultPass: DEFAULT_PASS,
    DefaultImgCar : DEFAULT_IMG_VEHICULO,
    RootEmail: EMAIL,
    RootPass: PASS,
    RootImg: IMG,
}
