const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/dbConfig');

class SocialInteraction extends Model {}

SocialInteraction.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    comments: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    sequelize,
    modelName: 'SocialInteraction'
});

module.exports = SocialInteraction;
