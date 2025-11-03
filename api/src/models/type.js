const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Types = sequelize.define('Types',{
    name: {
        type: DataTypes.STRING(120),
        allowNull: false,
    },
});

module.exports = Types;