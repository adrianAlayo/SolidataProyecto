const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Variant = sequelize.define('Variants',{
    name: {
        type: DataTypes.STRING (100),
        allowNull: false,
    },
    description: DataTypes.TEXT,
});

module.exports = Variant