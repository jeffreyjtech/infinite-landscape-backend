'use strict';

const bearerAuth = require('./auth/middleware/bearer.js'); // eslint-disable-line no-unused-vars
const perms = require('./auth/middleware/perms.js'); // eslint-disable-line no-unused-vars

jest.mock('./auth/middleware/bearer.js', () => (req, res, next) => {
  next();
});
jest.mock('./auth/middleware/perms.js', () => (collection) => (req, res, next) => {
  next();
});

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

  // The .mock.calls array contains all the info about how a mock function has been invoked
  // Middleware is added by invoking router.get/.post/.put,etc with a middleware function we've written
  // Thus, it's possible to test our middleware by pulling the middleware function out of the calls array
  // We invoke it in the test sequence and expect side-effects such as next being called. 

  const getCall = router.get.mock.calls[0]; // Assign each call to a variable (for clarity)
  const getIdCall = router.get.mock.calls[1]; 
  const postCall = router.post.mock.calls[0];
  const putCall = router.put.mock.calls[0];
  const deleteCall = router.delete.mock.calls[0];
  let middleware = {};
  let middlewareIndex = 0;

  it('Has a GET route', async () => {
    middlewareIndex = getCall.length - 1; // Find our middleware by finding the last item in the list of arguments
    middleware = getCall[middlewareIndex]; // Assign the middleware to a variable (for clarity)
    await middleware(req, res, next); // Invoke the middleware
    // Expect various side effects to occur with our mocked collection methods and mocked express objects/methods
    expect(testCollection.readAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('Has a GET with id route', async () => {
    middlewareIndex = getIdCall.length - 1;
    middleware = getIdCall[middlewareIndex];
    await middleware(req, res, next);
    expect(testCollection.read).toHaveBeenCalledWith(req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('Has a POST route', async () => {
    middlewareIndex = postCall.length - 1;
    middleware = postCall[middlewareIndex];
    await middleware(req, res, next);
    expect(testCollection.create).toBeCalledWith(req.body);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('Has a PUT route', async () => {
    middlewareIndex = putCall.length - 1;
    middleware = putCall[middlewareIndex];
    await middleware(req, res, next);
    expect(testCollection.update).toHaveBeenCalledWith(req.body, req.params.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('Has a DELETE route', async () => {
    middlewareIndex = deleteCall.length - 1;
    middleware = deleteCall[middlewareIndex];
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
