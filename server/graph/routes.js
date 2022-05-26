'use strict';

const express = require('express');
const router = express.Router();

const { storyCollection } = require('../models');

storyCollection.readAllInGroup = async function (group) {
  const instances = await this.model.findAll({ where: { group: group } });

  return instances;
};

router.get('/graph/:id', async (req, res, next) => {
  try {
    let record = await storyCollection.read(req.params.id);
    let subGraph = [];

    while (record.dataValues.neighbors.length) {
      subGraph.push(await storyCollection.read(record.dataValues.neighbors.pop()));
    }
    res.status(200).json(subGraph);
  } catch (error) {
    console.error(error);
    next(error);
  }
},
);

module.exports = router;
