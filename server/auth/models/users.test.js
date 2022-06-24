'use strict';

const userModel = require('./users');

jest.mock('bcrypt', () => ({ compare: jest.fn(() => false), hash: jest.fn() }));

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(() => ({ username: 'token-hashed-username' })),
}));

const sequelize = {
  define: jest.fn(() => ({
    findOne: jest.fn(() => false),
    beforeCreate: jest.fn(),
  })),
};

const DataTypes = { ENUM: jest.fn() };

describe('Testing users auth database model', () => {
  const users = userModel(sequelize, DataTypes);

  it('Returns a model with appropriate methods', () => {
    expect(users.beforeCreate).toHaveBeenCalled();
    expect(users.authenticateBasic).toEqual(expect.any(Function));
    expect(users.authenticateToken).toEqual(expect.any(Function));
  });

  // test('authenticateBasic method throws error if user is not found', () => {
  //   expect.assertions(2);
  //   try {
  //     users.authenticateBasic('username', 'password');
  //   } catch (e) {
  //     expect(e).toEqual(expect.any(Error));
  //   }
  //   expect(users.findOne).toHaveBeenLastCalledWith({ where: { username: 'username' } });
  // });

  // test('authenticateToken method throws error if user is not found', () => {
  //   expect(() => users.authenticateToken()).toThrow();
  // });
});
