'use strict';

const { Sequelize } = require('sequelize');
const Collection = require('./Collection');
const profileSchema = require('./profile');
const storySchema = require('./story');

const { NODE_ENV, DATABASE_URL } = process.env;

const dbUrl = NODE_ENV === 'test' ? 'sqlite:content' : DATABASE_URL;

const config = DATABASE_URL
  ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
  : {};

const sequelize = new Sequelize(dbUrl, config);

module.exports = {
  contentDb: sequelize,
  profile: new Collection(sequelize, 'profiles', profileSchema),
  story: new Collection(sequelize, 'stories', storySchema),
};
