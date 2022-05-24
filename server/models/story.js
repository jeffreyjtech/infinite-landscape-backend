'use strict';

const { DataTypes } = require('sequelize');

const genres = ['horror', 'sci-fi', 'fantasy', 'medieval', 'contemporary', 'surreal', 'goofy'];

const storySchema = {
  title: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  penName: { type: DataTypes.STRING, allowNull: false },
  storyId: { type: DataTypes.STRING, allowNull: false, unique: true },
  description: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.ENUM(genres), allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  tooltips: { type: DataTypes.JSON },
};

module.exports = storySchema;
