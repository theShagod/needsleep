const {Sequelize} = require('sequelize');
const env =  process.env.NODE_ENV || "development"
const config = require('../config/config.json')[env]
const sequelize = new Sequelize(config)


const dbs = [
    require('./User'),
    require('./Bed')
];

for (const db of dbs){
    db(sequelize)
}

//associations
const {User, Bed} = sequelize.models;
User.hasMany(Bed);

module.exports = sequelize;