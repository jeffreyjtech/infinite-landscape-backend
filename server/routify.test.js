'use strict';

const routify = require('./routify');

const router = {
  post: jest.fn(),
  get: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
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

const res = jest.fn();
const next = jest.fn();

describe('Testing the router constructor', () => {
  const newRoute = routify(testCollection, 'test', router);
  const calls = router.get.mock.calls;

  it('Has a GET route', () => {
    const middleware = calls[0][1];
    console.log(middleware(req, res, next));
    expect().toHaveBeenCalled();
  });
  it('Has a POST route', () => {
    expect(true).toBe(false);
  });
  it('Has a GET with id route', () => {
    expect(true).toBe(false);
  });
  it('Has a PUT route', () => {
    expect(true).toBe(false);
  });
  it('Has a DELETE route', () => {
    expect(true).toBe(false);
  });
  it('Does not have a DELETE route for profile path', () => {
    expect(true).toBe(false);
  });
});
