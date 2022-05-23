'use strict';

const { authSequelize } = require('./server/auth/models');
const { contentSequelize } = require('./server/models');
const { start } = require('./server');
const PORT = process.env.PORT || 3000;

authSequelize.sync()
  .then(() => {
    console.log('Auth DB is synced');
  })
  .catch(console.error);

contentSequelize.sync()
  .then(() => {
    console.log('Content DB is synced');
    start(PORT);
  })
  .catch(console.error);