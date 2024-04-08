import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Province",
    {
      idProvince: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
      },
      descProvince: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
