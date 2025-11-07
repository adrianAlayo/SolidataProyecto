const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Role = sequelize.define('Roles',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: DataTypes.TEXT,
},{
    timestamps: false,
})

module.exports = Role