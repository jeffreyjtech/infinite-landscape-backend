'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./Collection');
const profileSchema = require('./profile');
const storySchema = require('./story');
//const adjacencyModel = require('./adjacencies');

const { DATABASE_URL, NODE_ENV } = process.env;

const dbUrl = DATABASE_URL || 'postgresql://localhost:5432';

const config =
  NODE_ENV !== 'test' && DATABASE_URL
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : { /*logging: false*/ };

const sequelize = new Sequelize(dbUrl, config);

const profileCollection = new Collection(sequelize, 'profiles', profileSchema);
const storyCollection = new Collection(sequelize, 'stories', storySchema);

//const adjacencies = adjacencyModel(sequelize, DataTypes);

module.exports = {
  contentDb: sequelize,
  profileCollection: profileCollection,
  storyCollection: storyCollection,
  //adjacencies: adjacencies,
};
