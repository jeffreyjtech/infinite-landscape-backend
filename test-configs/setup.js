'use strict';

// const { authSequelize } = require('../server/auth/models');
const { contentDb } = require('../server/models/');

module.exports = async () => {
  // await authSequelize.sync();
  await contentDb.sync();
  console.log('TEST Databases are synced');
};