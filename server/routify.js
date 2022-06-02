'use strict';

const bearerAuth = require('./auth/middleware/bearer.js');
const perms = require('./auth/middleware/perms.js');

const errorWithStatus = require('./error/ErrorWithStatus');

const errorOnEmptyBody = (req, res, next) => {
  if (!req.body) {
    next(errorWithStatus('Missing request body', 400));
  } else {
    next();
  }
};

const errorOnBadParam = (paramKey) => (req, res, next) => {
  if (!req.params || !req.params[paramKey]) {
    next(errorWithStatus(`Missing URL param: ${paramKey}`, 400));
  } else {
    next();
  }
};

module.exports = (collection, path, router) => {
  router.post(`/${path}`, errorOnEmptyBody, bearerAuth, async (req, res, next) => {
    try {
      let record = await collection.create(req.body);
      res.status(201).json(record);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.get(`/${path}`, async (req, res, next) => {
    try {
      let records = await collection.readAll();
      res.status(200).json(records);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.get(`/${path}/:id`, errorOnBadParam('id'), async (req, res, next) => {
    try {
      let record = await collection.read(req.params.id);
      res.status(200).json(record);
    } catch (e) {
      console.error(e);
      next(e);
    }
  });

  router.put(
    `/${path}/:id`,
    errorOnBadParam('id'),
    errorOnEmptyBody,
    bearerAuth,
    perms(collection),
    async (req, res, next) => {
      try {
        let record = await collection.update(req.body, req.params.id);
        res.status(200).json(record);
      } catch (e) {
        console.error(e);
        next(e);
      }
    },
  );

  if (path !== 'profile') {
    router.delete(
      `/${path}/:id`,
      errorOnBadParam('id'),
      bearerAuth,
      perms(collection),
      async (req, res, next) => {
        try {
          let record = await collection.delete(req.params.id);
          res.status(200).json(record);
        } catch (e) {
          console.error(e);
          next(e);
        }
      },
    );
  }

  return router;
};
