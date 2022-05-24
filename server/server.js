'use strict';

const express = require('express');
const app = express();

module.exports = {
  app,
  start: (PORT) => app.listen(PORT, () => console.log('App is listening on ', PORT)),
};
