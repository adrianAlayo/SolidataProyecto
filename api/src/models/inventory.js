const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Inventories = sequelize.define('Inventories',{
    received: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    available: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    area: {
        type: DataTypes.STRING (150),
        allowNull: false
    },
});

module.exports = Inventories;