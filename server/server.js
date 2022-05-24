'use strict';

const express = require('express');
const { profileCollection, storyCollection } = require('./models');
const routify = require('./routify');
const app = express();

app.use(routify(profileCollection, 'profile'));
app.use(routify(storyCollection, 'story'));

module.exports = {
  app,
  start: (PORT) => app.listen(PORT, () => console.log('App is listening on ', PORT)),
};
