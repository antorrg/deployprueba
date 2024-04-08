import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "CategoryPost",
    {
      idCategory: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      descCategory: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    { timestamps: false }
  );
};
