'use strict';

const { authDb } = require('./server/auth/models');
const { contentDb } = require('./server/models');
const { start } = require('./server/server');

require('dotenv').config();

const PORT = process.env.PORT || 3001;

console.log(process.env.PORT);

authDb.sync()
  .then(() => {
    console.log('Auth DB is synced');
  })
  .catch(console.error);

contentDb.sync()
  .then(() => {
    console.log('Content DB is synced');
    start(PORT);
  })
  .catch(console.error);
