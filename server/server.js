'use strict';

const express = require('express');
const { profileCollection, storyCollection } = require('./models');
const routify = require('./routify');
const authRouter = require('./auth/routes');
const graphRouter = require('./graph/routes');
const router = express.Router();
const app = express();

const swaggerUi = require('swagger-ui-express');
const  swaggerDocument =  require('./swagger.json');

app.use(express.json());
app.use(authRouter);
app.use(routify(profileCollection, 'profile', router));
app.use(routify(storyCollection, 'story', router));
app.use(graphRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = {
  app,
  start: (PORT) => app.listen(PORT, () => console.log('App is listening on ', PORT)),
};
