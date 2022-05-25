'use strict';

const adjacencyModel = (sequelize, DataTypes) => {
  return sequelize.define('adjacencies', {
    storyId: { type: DataTypes.INTEGER, allowNull: false },
    neighbors: { type: DataTypes.ARRAY(DataTypes.INTEGER), allowNull: false },
  });
};

module.exports = adjacencyModel;
