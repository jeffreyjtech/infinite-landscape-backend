'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const userModel = require('./users');

const { HEROKU_POSTGRESQL_GOLD_URL, NODE_ENV } = process.env;

const DATABASE_URL = NODE_ENV === 'test' ? DATABASE_URL : HEROKU_POSTGRESQL_GOLD_URL;

// This will assign the Heroku-specific configs if the database is deployed.
const config =
  NODE_ENV !== 'test' && DATABASE_URL
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : {/*logging: false*/};

const dbUrl = DATABASE_URL || 'postgresql://localhost:5432';

const sequelize = new Sequelize(dbUrl, config);

module.exports = {
  authDb: sequelize,
  users: userModel(sequelize, DataTypes),
};
