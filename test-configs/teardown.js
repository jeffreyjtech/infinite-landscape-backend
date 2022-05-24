'use strict';

const { authDb } = require('../server/auth/models');
const { contentDb } = require('../server/models/');

module.exports = () => {
  authDb.drop();
  contentDb.drop({});
};
