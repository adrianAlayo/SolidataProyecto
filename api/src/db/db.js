const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize (DB_NAME,'postgres',DB_PASSWORD,{
    host: DB_HOST,
    dialect: DB_DIALECT,
    logging: false,
})

module.exports = sequelize