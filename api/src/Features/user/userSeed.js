import envConfig from '../../Configs/envConfig.js'
import { Hasher } from '../../Shared/Utils/Hasher.js'
import { UuidHandler } from '../../Shared/Utils/UuidHandler.js'
import { User } from '../../Configs/database.js'

export const initialUser = async () => {
  const hasheredPass = await Hasher.hash(envConfig.RootPass)
  const data = {
    userId: UuidHandler.idCreator(),
    email: envConfig.RootEmail,
    nickname: envConfig.RootEmail.split('@')[0],
    name: 'Propietario',
    password: hasheredPass,
    role: 'DUENO',
    picture: envConfig.RootImg,
    enabled: true
  }
  try {
    const existingUser = await User.findOne({
      where: { email: envConfig.RootEmail }
    })
    if (existingUser) {
      console.log('El usuario ya existe')
      return console.log(existingUser)
    }
    const user = await User.create(data)
    console.log('The user was successfully created!!')
    return console.log(user)
  } catch (error) {
    console.error('Algo ocurrió al inicio: ', error)
  }
}
initialUser()
  .then(() => {
    console.log('Seed finalizado')
  })
  .catch((err) => {
    console.error(err)
    process.exitCode = 1
  })
