'use strict';

const bearerAuth = require('./auth/middleware/bearer.js');
const perms = require('./auth/middleware/perms.js');

const errorWithStatus = require('./error/ErrorWithStatus');

const _validateBody = (req) => {
  if (!req.body) {
    throw errorWithStatus('Missing request body', 400);
  }
};

const _validateParam = (req, paramKey) => {
  if (!req.params || !req.params[paramKey]) {
    throw errorWithStatus(`Missing URL param: ${paramKey}`, 400);
  }
};

const postHandler = (collection) => async (req, res, next) => {
  try {
    _validateBody(req);
    let record = await collection.create(req.body);
    res.status(201).json(record);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getHandler = (collection) => async (req, res, next) => {
  try {
    let records = await collection.readAll();
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getIdHandler = (collection) => async (req, res, next) => {
  try {
    _validateParam(req, 'id');
    let record = await collection.read(req.params.id);
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const putHandler = (collection) => async (req, res, next) => {
  try {
    _validateBody(req);
    _validateParam(req, 'id');
    let record = await collection.update(req.body, req.params.id);
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const deleteHandler = (collection) => async (req, res, next) => {
  try {
    _validateParam(req, 'id');
    let record = await collection.delete(req.params.id);
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    next(e);
  }
};

module.exports = {
  routify: (collection, path, router) => {
    router.post(`/${path}`, bearerAuth, postHandler(collection));

    router.get(`/${path}`, getHandler(collection));

    router.get(`/${path}/:id`, getIdHandler(collection));

    router.put(
      `/${path}/:id`,
      bearerAuth,
      perms(collection),
      putHandler(collection),
    );

    if (path !== 'profile') {
      router.delete(
        `/${path}/:id`,
        bearerAuth,
        perms(collection),
        deleteHandler(collection),
      );
    }

    return router;
  },
  getHandler,
  getIdHandler,
  postHandler,
  putHandler,
  deleteHandler,
};
