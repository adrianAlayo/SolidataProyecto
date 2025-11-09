const sequelize = require('../db/conexion.js');
const {DataTypes} = require('sequelize');

const Donation = sequelize.define('Donations', {
    donorType: {
        type: DataTypes.ENUM ('Institution','User'),
        allowNull: false
    },
    donor_id: DataTypes.INTEGER,
    note: DataTypes.TEXT,
        donation_date: {
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