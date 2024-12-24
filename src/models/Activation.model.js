const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ActivationModel = sequelize.define(
  "Activation",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    expireDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["activation", "resetPassword"],
      allowNull: false,
    },
  },
  { timestamps: true }
);

module.exports = ActivationModel;
