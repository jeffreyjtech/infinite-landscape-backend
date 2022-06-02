'use strict';

const perms = require('./perms');

// Unit test of perms middleware

const testCollection = {
  read: jest.fn((id) => {
    if (id === 1) {
      return { username: 'user1' };
    } else {
      return undefined;
    }
  }),
  readAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn(() => res),
};

const next = jest.fn();

const admin = { username: 'admin', role: 'admin' };
const user1 = { username: 'user1', role: 'user' };
const user2 = { username: 'user2', role: 'user' };

describe('Testing perms middleware', () => {
  const middleware = perms(testCollection);

  it('should call next with no args if requestor is author', async () => {
    const req = {
      params: { id: 1 },
      user: user1,
    };

    await middleware(req, res, next);

    expect(testCollection.read).toHaveBeenCalled();
    expect(next).toHaveBeenCalled();
    // toHaveBeenLastCalledWith will fail if the call had no args
    // Therefore, we invert it, since we DO want that call to have no args
    expect(next).not.toHaveBeenLastCalledWith(expect.anything());
  });

  it('should call next with a status 403 error if requestor is NOT author', async () => {
    const req = {
      params: { id: 1 },
      user: user2,
    };

    await middleware(req, res, next);

    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenLastCalledWith(expect.objectContaining({ status: 403 }));
  });

  it('should call next with no args if requestor has admin role', async () => {
    const req = {
      params: { id: 1 },
      user: admin,
    };

    await middleware(req, res, next);

    expect(next).not.toHaveBeenLastCalledWith(expect.anything());
  });

  it('should call next with a status 404 error if the record query returns undefined', async () => {
    const req = {
      params: { id: 2 },
      user: admin,
    };

    await middleware(req, res, next);

    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenLastCalledWith(expect.objectContaining({ status: 404 }));
  });
});
