const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const TransactionModel = sequelize.define(
  "Transaction",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["payment", "topup", "transfer"],
    },
    status: {
      type: DataTypes.ENUM,
      values: ["pending", "success", "fail", "refund"],
    },
    amount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    fromId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    toId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  { timestamps: true }
);

module.exports = TransactionModel;
