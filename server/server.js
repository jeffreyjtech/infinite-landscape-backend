'use strict';

const cors = require('cors');

const express = require('express');
const { profileCollection, storyCollection } = require('./models');
const { routify } = require('./routify');
const authRouter = require('./auth/routes');
const graphRouter = require('./graphRouter');
const router = express.Router();
const app = express();

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

app.use(cors());

app.use(express.json());
app.use(authRouter);
app.use(routify(profileCollection, 'profile', router));
app.use(routify(storyCollection, 'story', router));
app.use(graphRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use((error, req, res, next) => {
  res.status(error.status || 500).send(error.message || 'Unknown server error');
});

module.exports = {
  app,
  start: (PORT) => app.listen(PORT, () => console.log('App is listening on ', PORT)),
};
