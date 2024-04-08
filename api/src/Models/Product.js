import { DataTypes } from "sequelize";

export default (sequelize) => {
  sequelize.define(
    "Product",
    {
      idProduct: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nameProduct: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      descProduct: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      images: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    { timestamps: false }
  );
};
