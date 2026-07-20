import { DataTypes } from 'sequelize'

export default (sequelize) => {
  return sequelize.define('Service', {
    serviceId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    detail: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_in: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    date_out: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    observations: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: true
    },
    enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
    canceled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    fullfilled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  },
  {
    timestamps: true,
    paranoid: true
  }
  )
}
