'use strict';

const bearerAuth = require('./auth/middleware/bearer.js'); // eslint-disable-line no-unused-vars
const perms = require('./auth/middleware/perms.js'); // eslint-disable-line no-unused-vars

jest.mock('./auth/middleware/bearer.js', () => (req, res, next) => {
  next();
});
jest.mock('./auth/middleware/perms.js', () => (collection) => (req, res, next) => {
  next();
});

const {
  routify,
  getHandler,
  getIdHandler,
  postHandler,
  putHandler,
  deleteHandler,
} = require('./routify');

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

const errorCollection = {
  read: jest.fn(() => {
    throw new Error();
  }),
  readAll: jest.fn(() => {
    throw new Error();
  }),
  create: jest.fn(() => {
    throw new Error();
  }),
  update: jest.fn(() => {
    throw new Error();
  }),
  delete: jest.fn(() => {
    throw new Error();
  }),
};

console.error = jest.fn();

const req = {
  params: { id: 1 },
  body: { test: 'test-body' },
};

const badParamReq = {
  body: { test: 'test-body' },
};

const badBodyReq = {
  params: { id: 1 },
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn(() => res),
};
const next = jest.fn();

test('Routify calls router methods', () => {
  routify(testCollection, 'test path', router);

  expect(router.get).toHaveBeenCalled();
  expect(router.delete).toHaveBeenCalled();
  expect(router.put).toHaveBeenCalled();
  expect(router.post).toHaveBeenCalled();
});

test('No DELETE route is added for profile path', async () => {
  const deleteArgsCount = router.delete.mock.calls.length;
  routify(testCollection, 'profile', router);
  expect(router.delete).toHaveBeenCalledTimes(deleteArgsCount);
});

describe('Testing the individual middlewares', () => {
  test('GET handler reads all', async () => {
    await getHandler(testCollection)(req, res, next); // Invoke the middleware
    // Expect various side effects to occur with our mocked collection methods and mocked express objects/methods
    expect(testCollection.readAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('GET with id handler reads with id', async () => {
    await getIdHandler(testCollection)(req, res, next);
    expect(testCollection.read).toHaveBeenLastCalledWith(req.params.id);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('POST handler creates a document', async () => {
    await postHandler(testCollection)(req, res, next);
    expect(testCollection.create).toBeCalledWith(req.body);
    expect(res.status).toHaveBeenLastCalledWith(201);
    expect(res.json).toHaveBeenCalled();
  });

  it('PUT handler updates a document', async () => {
    await putHandler(testCollection)(req, res, next);
    expect(testCollection.update).toHaveBeenLastCalledWith(req.body, req.params.id);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });

  it('DELETE handler deletes a document', async () => {
    await deleteHandler(testCollection)(req, res, next);
    expect(testCollection.delete).toHaveBeenLastCalledWith(req.params.id);
    expect(res.status).toHaveBeenLastCalledWith(200);
    expect(res.json).toHaveBeenCalled();
  });
});

describe('Testing each middleware catches collection errors', () => {
  it('Catches collection error on POST route', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await postHandler(errorCollection)(req, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Catches collection error on GET route', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await getHandler(errorCollection)(req, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Catches collection error on GET with id route', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await getIdHandler(errorCollection)(req, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Catches collection error on PUT route', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await putHandler(errorCollection)(req, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Catches collection error on DELETE route', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await deleteHandler(errorCollection)(req, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });
});

describe('Each middleware throws error on bad requests', () => {

  it('Throws error on bad body on POST', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await postHandler(testCollection)(badBodyReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Throws error on bad param on GET with id', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await getIdHandler(testCollection)(badParamReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Throws error on bad body on PUT', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await putHandler(testCollection)(badBodyReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Throws error on bad param on PUT', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await putHandler(testCollection)(badParamReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });

  it('Throws error on bad param on DELETE', async () => {
    const errorCount = console.error.mock.calls.length;
    const nextCount = next.mock.calls.length;
    await deleteHandler(testCollection)(badParamReq, res, next);
    expect(console.error).toHaveBeenCalledTimes(errorCount + 1);
    expect(next).toHaveBeenLastCalledWith(expect.any(Error));
    expect(next).toHaveBeenCalledTimes(nextCount + 1);
  });
});
