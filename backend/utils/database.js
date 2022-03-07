const Sequelize = require("sequelize");

const sequelize = new Sequelize("package-delivery", "root", "Adhyan@2000", {
  dialect: "mysql",
  host: "localhost",
  logging: false
});

module.exports = sequelize;