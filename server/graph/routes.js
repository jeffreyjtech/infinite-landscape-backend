'use strict';

const express = require('express');
const router = express.Router();

const { adjacencies, storyCollection } = require('../models');

storyCollection.readAllInGroup = function async(group) {
  const instances = this.model.findAll({ where: { group: group } });
  return instances;
};

router.get('/graph/:id', async (req, res, next) => {
  try {
    let record = await adjacencies.findOne({ where: { id: req.params.id } });
    let subGraph = [];
    console.log('record is ', record);
    while (record.neighbors.length) {
      subGraph.push(await adjacencies.findOne({ where: { id: record.neighbors.pop() } }));
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
  // console.log('model ', adjacencies);
  try {


    let potentialNeighborStories = await storyCollection.readAllInGroup(req.body.group);



    console.log('potential neighbors is ', potentialNeighborStories);


    if (potentialNeighborStories && potentialNeighborStories.length) {
      for (let neighborStory of potentialNeighborStories) {
        let record = await adjacencies.findAll({ where: { storyId: neighborStory.id } });
        console.log('record is ', record);
        if (record.neighbors.length < 4) {
          record.neighbors.push(req.body.id);
          response = await adjacencies.update(record, { where: { id: neighborStory.id } });
          break;
        }
      }
      res.send(204).json(response);
    } else {
      console.log(req.body);
      response = await adjacencies.create({ storyId: req.body.id, neighbors: [] });

      res.send(204).json(response);
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
