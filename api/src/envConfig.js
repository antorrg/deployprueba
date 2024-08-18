import {config} from 'dotenv'
const envFile = process.env.NODE_ENV==='production'? '.env.production' : process.env.NODE_ENV==='development'?'.env.development' : '.env.test';
config({path: envFile})

const {PORT, DB_USER, DB_PASS, DB_HOST,DB_NAME, DATABASE_URL, USER_IMAGE, SECRET_KEY, DEFAULT_PASS, DEFAULT_IMG_VEHICULO, EMAIL, PASS, IMG, }=process.env;
const localDB = `postgres://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}`

export default {
    Port: PORT,
    Status: process.env.NODE_ENV==='production'? 'in production' :  process.env.NODE_ENV==='development'?'in development' : 'in testing',
    ConnectDB : process.env.NODE_ENV==='production'? DATABASE_URL : localDB,
    UserImg: USER_IMAGE,
    SecretKey : SECRET_KEY,
    DefaultPass: DEFAULT_PASS,
    DefaultImgCar : DEFAULT_IMG_VEHICULO,
    RootEmail: EMAIL,
    RootPass: PASS,
    RootImg: IMG,
}

// #>>>>>>>>>>>>>>>>>>Variables de Usuario<<<<<<<<<<<<<<<<<<<<<<<<<<
// USER_IMAGE= https://c0.klipartz.com/pngpicture/813/118/gratis-png-icono-de-silueta-plantilla-de-persona-en-blanco.png
// SECRET_KEY=f0988b6119c161a9b170825412c00a4774486a999c67afb0904a49ec9f9e8bc6
// DEFAULT_PASS=L1234567
// DEFAULT_IMG_VEHICULO= https://firebasestorage.googleapis.com/v0/b/boscarol-f2a0a.appspot.com/o/images%2FnoVehiculo.jpg?alt=media&token=e059f070-39ce-4e83-a515-9d92f403608f
// #>>>>>>>>>>>>>>>>>>> Variable de super usuario <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// EMAIL=propietariotaller@nose.com,mecanico@tukis.com
// PASS=pPPPassword1,coRRRntrasenia2
// IMG=https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlS5RxkLK9Fs5b-mv3eMh-LWLZkVbphQrNPA&usqp=CAU
