'use strict';

// const { authSequelize } = require('../server/auth/models');
const { contentDb } = require('../server/models/');

module.exports = () => {
  // authSequelize.drop();
  contentDb.drop({});
};