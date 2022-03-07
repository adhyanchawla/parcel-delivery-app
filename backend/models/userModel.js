const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    phone: DataTypes.STRING(13),
    country: DataTypes.STRING,
    state: DataTypes.STRING,
    city: DataTypes.STRING,
    pin: DataTypes.STRING(6),
    otp: {
        type: DataTypes.STRING(6),
        defaultValue: null,
    },
    isVerified : {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
});


module.exports = User;