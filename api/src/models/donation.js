const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Donation = sequelize.define('Donations', {
    donation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM ('Scheduled','Delivered','Not Delivered'),
        defaultValue: 'Scheduled',
    },
    note: DataTypes.TEXT,
},{
    timestamps: true,
});

module.exports = Donation