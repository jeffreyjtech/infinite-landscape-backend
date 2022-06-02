'use strict';
// Unit test of perms middleware

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


