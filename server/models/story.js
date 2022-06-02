'use strict';

const { DataTypes } = require('sequelize');

const genres = [
  'horror',
  'sci-fi',
  'fantasy',
  'medieval',
  'contemporary',
  'surreal',
  'goofy',
  'tutorial',
  'void',
];

const storySchema = {
  label: { type: DataTypes.STRING, allowNull: false },
  username: { type: DataTypes.STRING, allowNull: false },
  penName: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  group: { type: DataTypes.ENUM(genres), allowNull: false },
  color: { type: DataTypes.STRING, allowNull: false },
  tooltips: { type: DataTypes.JSON },
  neighbors: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
    defaultValue: [],
  },
};

module.exports = storySchema;
