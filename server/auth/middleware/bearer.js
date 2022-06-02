'use strict';

const errorWithStatus = require('../../error/ErrorWithStatus');
const { users } = require('../models');

module.exports = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw errorWithStatus('Missing authorization headers', 403);
    }
    const token = req.headers.authorization.split(' ').pop();
    const validUser = await users.authenticateToken(token);
    req.user = validUser;
    req.token = validUser.token;
    next();
  } catch (error) {
    console.error(error);
    error.status = error.status || 403;
    next(error);
  }
};
