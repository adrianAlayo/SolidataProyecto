const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Permission = sequelize.define('Permission',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
},{
    timestamps: false,
})

module.exports = Permission