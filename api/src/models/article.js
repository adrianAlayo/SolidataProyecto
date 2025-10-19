const sequelize = require('../db/db.js');
const {DataTypes} = require('sequelize');

const Article = sequelize.define('Articles',{
    name: {
        type: DataTypes.STRING (100),
        allowNull: false,
    },
    category: DataTypes.STRING (50),
    unit: DataTypes.STRING (20),
    description: DataTypes.TEXT,
});

module.exports = Article