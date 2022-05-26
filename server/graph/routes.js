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

router.post('/graph', async (req, res, next) => {
  let response;

  try {

    let potentialNeighborStories = await storyCollection.readAllInGroup(req.body.group);

    // if (potentialNeighborStories.dataValues.neighbors.length) {
    for (let neighborStory of potentialNeighborStories) {
      if (neighborStory.dataValues.id !== req.body.id) {
        if (neighborStory.dataValues.neighbors.length < 4) {
          neighborStory.dataValues.neighbors.push(req.body.id);

          response = await storyCollection.update(neighborStory.dataValues.id, neighborStory.dataValues);

          break;
        }
      }
    }

    res.send(204).json(response);

    // } else {
    //   console.log(req.body);
    //   //response = await storyCollection.create({ storyId: req.body.id, neighbors: [] });

    //   res.send(204).json(response);

    // }

  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
