'use strict';

const errorWithStatus = require('../../error/errorWithStatus');

module.exports = (collection) => async (req, res, next) => {
  try {
    const foundMessage = await collection.read(req.params.id);

    if (!foundMessage) throw errorWithStatus('Resource not found', 404);

    // req.user has all the user info from bearerAuth middleware
    // Including the user's verified role and username
    if (req.user.username === foundMessage.username || req.user.role === 'admin') {
      next();
    } else {
      next(errorWithStatus('You cannot modify another user\'s content', 403));
    }
  } catch (error) {
    console.error(error);
    error.status = 403;
    next(error);
  }
};
