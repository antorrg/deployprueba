import { Sequelize } from "sequelize";
import models from "./Models/index.js";
import env from './envConfig.js'

const sequelize = new Sequelize(env.ConnectDB, {
  logging: false, // set to console.log to see the raw SQL queries
   native: false, // lets Sequelize know we can use pg-native for ~30% more speed

 });


//* Iterar sobre los modelos y crearlos con Sequelize
Object.values(models).forEach((model) => model(sequelize));

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
} = sequelize.models;

//!Asociations:

User.belongsToMany(Car, { through: "user_car" });
Car.belongsToMany(User, { through: "user_car" });

Car.hasMany(Service), Service.belongsTo(Car);

Provider.belongsToMany(CategoryProvider,{through: 'categ_prov'});

CategoryProvider.belongsToMany(Provider,{through: 'categ_prov'});


Province.hasMany(Provider);
Provider.belongsTo(Province);

Province.hasMany(Commerce), 
Commerce.belongsTo(Province) 

CategoryPost.hasMany(Post),  Post.belongsTo(CategoryPost);


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
  sequelize,
};


//Client.belongsTo(Province, { foreignKey: "idProvince", allowNull: false });
//Provider.belongsTo(Province, { foreignKey: "idProvince", allowNull: false });
// Establecer la relación de categorías con sí misma para manejar la jerarquía
// Category.belongsTo(Category, {
//   as: "parentCategory",
//   foreignKey: "parentId",
// });
// Category.hasMany(Category, { as: "subcategories", foreignKey: "parentId" });
// Product.belongsTo(Category, { as: "subCategory", foreignKey: "subcategoryId" });


// Provider.belongsTo(CategoryProvider, {
//   foreignKey: "idCategory",
//   allowNull: false,
// });
// ImagesConfig.belongsTo(CategoryImg, {
//   foreignKey: "idCategory",
//   allowNull: false,
// });