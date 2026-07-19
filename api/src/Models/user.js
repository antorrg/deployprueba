import { DataTypes, } from 'sequelize'

export default (sequelize) => {
  return sequelize.define('User', {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    email: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    nickname: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: true },
    typeId: { type: DataTypes.STRING, allowNull: true },
    numberId: { type: DataTypes.STRING, allowNull: true },
    picture: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
    country: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  },
  { 
    timestamps: true,
    paranoid:true
  }
  )
}