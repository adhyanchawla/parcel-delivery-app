const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../utils/database");


const Orders = sequelize.define("orders", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  userId: DataTypes.INTEGER,
  type: DataTypes.STRING,
  weight: DataTypes.INTEGER,
  alternatePhone: DataTypes.STRING(13),
  length: DataTypes.INTEGER,
  width: DataTypes.INTEGER,
  pickupAddress: DataTypes.STRING,
  dropAddress: DataTypes.STRING,
  amount: DataTypes.INTEGER,
  orderStage: DataTypes.INTEGER,
  isPaid: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

module.exports = Orders;