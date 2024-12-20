const { Sequelize } = require("sequelize");
const config = require("../config");

const sequelize = new Sequelize(config.databaseURL);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection is successfull");
  })
  .catch((err) => {
    console.error("Database connection is failed", err);
  });

sequelize.sync({ alter: true });

module.exports = sequelize;
