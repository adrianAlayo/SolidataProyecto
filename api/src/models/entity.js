const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Entities = sequelize.define('Entities',{
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description: DataTypes.TEXT,
},{
    timestamps: false,
})

module.exports = Entities