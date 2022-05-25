'use strict';

const { DataTypes } = require('sequelize');

const adjacencySchema = {
  storyId: { type: DataTypes.STRING, allowNull: false },
  neighbors: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
};

module.exports = adjacencySchema;
