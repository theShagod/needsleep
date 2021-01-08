const {Sequelize, DataTypes} = require('sequelize');
const env =  process.env.NODE_ENV || "development"
const config = require('../config/config.json')[env]
const sequelize = new Sequelize(config)
sequelize.authenticate();

const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        } 
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

sequelize.sync({force:false});

module.exports = User;