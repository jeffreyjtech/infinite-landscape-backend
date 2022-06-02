'use strict';

const { DataTypes } = require('sequelize');

const profileSchema = {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  history: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  favorites: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
  contributions: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
};

module.exports = profileSchema;
