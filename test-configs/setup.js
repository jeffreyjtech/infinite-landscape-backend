'use strict';

const { authDb } = require('../server/auth/models');
const { contentDb } = require('../server/models/');

module.exports = async () => {
  await authDb.sync();
  await contentDb.sync();
  console.log('TEST Databases are synced');
};
