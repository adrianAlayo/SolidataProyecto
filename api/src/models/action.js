const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Actions = sequelize.define('Actions',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: DataTypes.TEXT,
},{
    timestamps: false,
})

module.exports = Actions