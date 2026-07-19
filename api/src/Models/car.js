import { DataTypes } from 'sequelize'

export default (sequelize) => {
  return sequelize.define('Car', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    patent: { type: DataTypes.STRING, allowNull: true },
    mark: { type: DataTypes.STRING, allowNull: false },
    model: { type: DataTypes.STRING, allowNull: false },
    year: { type: DataTypes.STRING, allowNull: true },
    motorNum: { type: DataTypes.STRING, allowNull: true },
    chassisNum: { type: DataTypes.STRING, allowNull: true },
    observations: { type: DataTypes.TEXT, allowNull: true },
    picture: { type: DataTypes.STRING, allowNull: false },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },

  },
  { 
    timestamps: true,
    paranoid: true
  }
  )
}
