'use strict';

const bearerAuth = require('./auth/middleware/bearer.js'); // eslint-disable-line no-unused-vars
const perms = require('./auth/middleware/perms.js'); // eslint-disable-line no-unused-vars

jest.mock('./auth/middleware/bearer.js', () => async (req, res, next) => next());
jest.mock('./auth/middleware/perms.js', () => async (req, res, next) => next());

const routify = require('./routify');

const router = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
  use: jest.fn(),
};

const testCollection = {
  read: jest.fn(),
  readAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const req = {
  params: { id: 1 },
  body: { test: 'test-body' },
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn(() => res),
};
const next = jest.fn();

describe('Testing the router constructor', () => {
  routify(testCollection, 'test', router);

  it('Has a GET route', async () => {
    const calls = router.get.mock.calls;
    const middleware = calls[0][1];
    await middleware(req, res, next);
    expect(testCollection.readAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('Has a POST route', async () => {
    const calls = router.post.mock.calls;
    const middleware = calls[0][2];
    await middleware(req, res, next);
    expect(testCollection.create).toBeCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });
  it('Has a GET with id route', async () => {
    const calls = router.get.mock.calls;
    const middleware = calls[1][2];
    await middleware(req, res, next);
    expect(testCollection.read).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('Has a PUT route', async () => {
    const calls = router.put.mock.calls;
    const middleware = calls[0][4];
    await middleware(req, res, next);
    expect(testCollection.update).toHaveBeenCalledWith(req.params.id, req.body);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
  it('Has a DELETE route', async () => {
    const calls = router.delete.mock.calls;
    const middleware = calls[0][3];
    await middleware(req, res, next);
    expect(testCollection.delete).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  routify(testCollection, 'profile', router);
  it('Does not have a DELETE route for profile path', () => {
    expect(router.delete).toHaveBeenCalledTimes(1);
  });
});
