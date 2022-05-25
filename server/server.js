'use strict';

const express = require('express');
const { profileCollection, storyCollection, adjacencyCollection } = require('./models');
const routify = require('./routify');
const authRouter = require('./auth/routes');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(authRouter);
app.use(routify(profileCollection, 'profile', router));
app.use(routify(storyCollection, 'story', router));
app.use(routify(adjacencyCollection, 'graph', router));

module.exports = {
  app,
  start: (PORT) => app.listen(PORT, () => console.log('App is listening on ', PORT)),
};
