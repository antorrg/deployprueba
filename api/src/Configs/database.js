import { Sequelize } from 'sequelize'
import models from '../Models/index.js'
import env from './envConfig.js'

const sequelize = new Sequelize(env.DatabaseUrl, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false // lets Sequelize know we can use pg-native for ~30% more speed

})

//* Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize))

const {
  User,
  Car,
  Service,
  Category,
  CategoryPost,
  Post,
  Product,
  Provider,
  Province,
  CategoryProvider,
  Commerce,
  ImagesConfig,
  CategoryImg,
  Test
} = sequelize.models

//! Asociations:

User.belongsToMany(Car, { through: 'user_car', onUpdate: 'CASCADE' })
Car.belongsToMany(User, { through: 'user_car', onUpdate: 'CASCADE' })

Car.hasMany(Service)
Service.belongsTo(Car)

Provider.belongsToMany(CategoryProvider, { through: 'categ_prov' })

CategoryProvider.belongsToMany(Provider, { through: 'categ_prov' })

Province.hasMany(Provider)
Provider.belongsTo(Province)

Province.hasMany(Commerce)
Commerce.belongsTo(Province)

CategoryPost.hasMany(Post)
Post.belongsTo(CategoryPost)

// ------------------------------------
//       Database methods
// ------------------------------------
function getNameDb (dbUri) {
  return dbUri.split('/').slice(-1).join()
}

export const dbName = getNameDb(env.DatabaseUrl)

async function startUp (synced = false, forced = false) {
  const icon = forced ? '🔶' : '🟠'
  try {
    if (synced === true) {
      await sequelize.sync({ force: forced })
      console.log(`${icon} Database postgres "${dbName}" synced with force: ${forced}\n`)
    } else {
      await sequelize.authenticate()

      console.log(`\n🟢​ Database postgres "${dbName}" initialized successfully!!\n`)// eslint-disable-line no-irregular-whitespace
    }
  } catch (error) {
    console.error(`❌​ Error inicializing database "${dbName}" `)// eslint-disable-line no-irregular-whitespace
    throw error
  }
}
const closedDatabase = async () => {
  try {
    await sequelize.close()
    console.log(`🔵​​ Database postgres "${dbName}" is closed!!`)// eslint-disable-line no-irregular-whitespace
  } catch (error) {
    console.error(`❌​ Error closing database "${dbName}" `)// eslint-disable-line no-irregular-whitespace
    throw error
  }
}

export {
  User,
  Car,
  Service,
  Category,
  CategoryPost,
  Post,
  Product,
  Provider,
  Province,
  CategoryProvider,
  Commerce,
  ImagesConfig,
  CategoryImg,
  Test,
  sequelize,
  startUp,
  closedDatabase
}
