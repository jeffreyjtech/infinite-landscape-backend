'use strict';

const express  = require('express');
const Collection = require('./models/Collection.js');
const router = express.Router();

const bearerAuth = require('./auth/middleware/bearer.js');
const permsAuth = require('./auth/middleware/perms.js');

module.exports = (model, path) => {

  router.post(`/${path}`, bearerAuth, async (req, res, next) => {
    let records = await Collection.create();
  });

  // router.get

  // router.get with id

  // router.put

  // router.delete
};