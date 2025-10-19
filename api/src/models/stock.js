const sequelize = require('../db/db.js');
const {DataTypes} = require('sequelize');

const Stock = sequelize.define('Stock',{
    total_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
    },
    available_quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        defaultValue: 0,
    },
});

module.exports = Stock