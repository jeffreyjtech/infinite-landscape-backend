'use strict';

const bearer = require('./bearer');
const { users } = require('../models');

jest.mock('../models', () => ({
  users: {
    authenticateToken: jest.fn((token) => {
      if (!token.includes('token')) {
        throw new Error();
      } else {
        return { username: 'bob', token: 'test-user-token' };
      }
    }),
  },
}));

const req = {
  headers: {
    authorization: 'Bearer test-header-token',
  },
};

const noAuthReq = {
  headers: {
    // nothing
  },
};

const partialAuthReq = {
  headers: {
    authorization: 'Bearer',
  },
};

const res = {};

const next = jest.fn();

console.error = jest.fn(() => console.log('Error logged'));

describe('Testing bearer middleware', () => {

  it('If everything is good, adds user and token to req object', async () => {
    await bearer(req, res, next);
    expect(users.authenticateToken).toHaveBeenLastCalledWith('test-header-token');
    expect(req.user).toStrictEqual({ username: 'bob', token: 'test-user-token' });
    expect(req.token).toBe('test-user-token');
  });

  it('Creates error if auth header is missing', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await bearer(noAuthReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Handles error thrown from authenticateToken method', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await bearer(partialAuthReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });
});
