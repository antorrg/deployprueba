const parsedUser = (user) => {
  if (user && user.dataValues) {
    // Si es un modelo de Sequelize, extrae solo los valores de los datos
    return { ...user.dataValues, password: undefined };
  }

  // Si no es un modelo de Sequelize, simplemente devuelve el objeto
  return { ...user, password: undefined };
};
  
 export default parsedUser;
