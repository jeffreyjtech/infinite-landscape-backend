'use strict';

const base64 = require('base-64');
const errorWithStatus = require('../../error/ErrorWithStatus');

const { users } = require('../models');

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    throw errorWithStatus('Missing authorization headers', 403);
  }
  try {
    let basic = req.headers.authorization.split(' ').pop();
    let [username, password] = base64.decode(basic).split(':');
    req.user = await users.authenticateBasic(username, password);
    next();
  } catch (error) {
    console.error(error);
    error.status = error.status || 403;
    next(error);
  }
};
