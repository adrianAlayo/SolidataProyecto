const sequelize = require('../db/db.js');
const {DataTypes} = require('sequelize');

const Role = sequelize.define('Roles',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: DataTypes.TEXT,
})

module.exports = Role