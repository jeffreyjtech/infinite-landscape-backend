'use strict';

module.exports = (message, code) => {
  let newError = new Error(message || 'unknown error');
  newError.status = code || 500;
  return newError;
};
