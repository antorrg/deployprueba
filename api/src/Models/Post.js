import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Post",
    {
      idPost: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      datePost: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      titlePost: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      textPost: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imgPost: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      published: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      viewFavPost: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      other: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    { timestamps: true }
  );
};
