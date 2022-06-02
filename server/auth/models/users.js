'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET || 'secretstring';

const userModel = (sequelize, DataTypes) => {
  const model = sequelize.define('users', {
    username: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: false,
      defaultValue: 'user',
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username }, SECRET);
      },
    },
  });

  model.beforeCreate(async (user) => {
    user.password = await bcrypt.hash(user.password, 10);
  });

  model.authenticateBasic = async function (username, password) {
    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  };

  model.authenticateToken = async function (token) {
    const parsedToken = jwt.verify(token, SECRET);
    const user = await this.findOne({ where: { username: parsedToken.username } });
    if (user) {
      return user;
    }
    throw new Error('User Not Found');
  };

  return model;
};

module.exports = userModel;
