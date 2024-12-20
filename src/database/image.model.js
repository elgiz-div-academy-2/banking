const { DataTypes } = require("sequelize");
const sequelize = require(".");

const ImageModel = sequelize.define(
  "Image",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

module.exports = ImageModel;
