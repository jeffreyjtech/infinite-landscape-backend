'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./Collection');
const profileSchema = require('./profile');
const storySchema = require('./story');

const { DATABASE_URL, NODE_ENV } = process.env;

const dbUrl = DATABASE_URL || 'postgresql://localhost:5432';

const config =
  NODE_ENV !== 'test' && DATABASE_URL
    ? { dialectOptions: { ssl: { require: true, rejectUnauthorized: false } } }
    : { /*logging: false*/ };

const sequelize = new Sequelize(dbUrl, config);

const profileCollection = new Collection(sequelize, 'profiles', profileSchema);
const storyCollection = new Collection(sequelize, 'stories', storySchema);

storyCollection.create = async function (json) {
  let potentialNeighborStories = await this.readAllInGroup(json.group);
  let newStory = await this.model.create(json);

  if (potentialNeighborStories.length === 0) {
    //console.log('no neighbors for ', newStory.id);
    potentialNeighborStories = await this.readAll();
    if (potentialNeighborStories.length === 0) {
      //console.log('graph is empty. returning detached node ', newStory.id);
      return newStory;
    }
  }

  for (let neighborStory of potentialNeighborStories) {
    //console.log('inspecting story: ', neighborStory.id);
    if (neighborStory.dataValues.id !== newStory.id) {
      //console.log('story', neighborStory.id, 'is not ', newStory.id, '. Inspecting neighbors: ', neighborStory.neighbors);
      if (neighborStory.dataValues.neighbors.length < 4) {
        let updatedStory = await this.update(newStory.id, { neighbors: [neighborStory.dataValues.id] });
        /*let updatedNeighbor = */await this.update(neighborStory.dataValues.id, { neighbors: [...neighborStory.dataValues.neighbors, newStory.id] });
        // console.log('outcome: new story ', newStory.id, 'has ', updatedStory.neighbors, 'and neighbor ', neighborStory.id, 'has ', updatedNeighbor.neighbors);
        return updatedStory;
      }
    }
  }
};

module.exports = {
  contentDb: sequelize,
  profileCollection: profileCollection,
  storyCollection: storyCollection,
};
