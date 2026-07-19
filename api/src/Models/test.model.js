import { DataTypes } from 'sequelize'

export default (sequelize) => {
  sequelize.define('Test',
    {
      testId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    { timestamps: false }
  )
}
