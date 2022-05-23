'use strict';

const { DataTypes } = require('sequelize');

const profileSchema = {
  username: { type: DataTypes.STRING, allowNull: false, unique: true },
  history: { type: DataTypes.ARRAY(DataTypes.STRING) },
  favorites: { type: DataTypes.ARRAY(DataTypes.STRING) },
  contributions: { type: DataTypes.ARRAY(DataTypes.STRING) },
};

module.exports = profileSchema;
