const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Article = sequelize.define('Articles',{
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    variant: {
        type: DataTypes.STRING(80),
        allowNull:false,
    },
    unit: {
        type: DataTypes.STRING(20),
        allowNull:false,
    },
},{
    timestamps: false,
});

module.exports = Article