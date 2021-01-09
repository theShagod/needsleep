const {Sequelize} = require('sequelize');
const env =  process.env.NODE_ENV || "development"
const config = require('../config/config.json')[env]
const sequelize = new Sequelize(config)
sequelize.authenticate();

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






sequelize.sync({force:true});
module.exports = sequelize