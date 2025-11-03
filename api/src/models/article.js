const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Article = sequelize.define('Articles',{
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category: DataTypes.STRING(50),
    variant: DataTypes.STRING(80),
    unit: DataTypes.STRING(20),
});

module.exports = Article