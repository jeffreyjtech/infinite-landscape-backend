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
    // console.log(req.params.id, ' found: ', record);
    let subGraph = [record];
    let visited = [record.id];
    let neighborIds = [...record.neighbors];

    while (neighborIds.length) {
      let neighborId = neighborIds.pop();
      subGraph.push(await storyCollection.read(neighborId));
      visited.push(neighborId);
    }
    let max = subGraph.length;
    for (let i = 0; i < max; i++) {
      let story = subGraph[i];
      let neighborIds = [...story.neighbors];
      while (neighborIds.length) {
        let neighborId = neighborIds.pop();
        if (!visited.includes(neighborId)) {
          subGraph.push(await storyCollection.read(neighborId));
          visited.push(neighborId);
        }
      }
    }
    console.log(subGraph);
    res.status(200).json(subGraph);
  } catch (error) {
    console.error(error);
    next(error);
  }
},
);

module.exports = router;
