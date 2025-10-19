const sequelize = require('../db/db.js');
const {DataTypes} = require('sequelize');

const Donation = sequelize.define('Donations', {
    quantity: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
    },
    donation_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    expiration_date: DataTypes.DATE,
    donor: DataTypes.STRING (120),
    note: DataTypes.TEXT,
    is_active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
},{
    timestamps: true,
});

module.exports = Donation