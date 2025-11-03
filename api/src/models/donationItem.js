const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const DonationItems = sequelize.define('DonationItems',{
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    expiration_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    note: DataTypes.STRING,
});

module.exports = DonationItems;