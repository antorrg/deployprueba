import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "ImagesConfig",
    {
      idImg: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nameImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      urlImg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      otherStringImg: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      otherIntegerImg: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
