const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Donation = sequelize.define('Donations', {
    note: DataTypes.TEXT,
        donation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    donation_date:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM ('Scheduled','Delivered','Not Delivered'),
        defaultValue: 'Scheduled',
    },
},{
    timestamps: true,
});

module.exports = Donation