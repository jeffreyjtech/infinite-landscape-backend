'use strict';

const errorWithStatus = require('../../error/ErrorWithStatus');

module.exports = (collection) => async (req, res, next) => {
  try {
    const foundContent = await collection.read(req.params.id);

    if (!foundContent) return next(errorWithStatus('Resource not found', 404));

    // req.user has all the user info from bearerAuth middleware
    // Including the user's verified role and username
    if (req.user.username === foundContent.username || req.user.role === 'admin') {
      next();
    } else {
      throw new Error();
    }
  } catch (error) {
    console.error(error);
    next(errorWithStatus('Unauthorized', 403));
  }
};
