'use strict';
const { Sequelize, DataTypes } = require('sequelize');
const Collection = require('./Collection');
const profileSchema = require('./profile');
const storySchema = require('./story');
//const adjacencyModel = require('./adjacencies');

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

  if(potentialNeighborStories.length === 0) {
    let record = await this.model.create({ ...json, neighbors: [] });
    return record;
  }

  // if (potentialNeighborStories.dataValues.neighbors.length) {
  for (let neighborStory of potentialNeighborStories) {
    if (neighborStory.dataValues.id !== json.id) {
      if (neighborStory.dataValues.neighbors.length < 4) {
        let newStory = await this.model.create({ ...json, neighbors: [neighborStory.dataValues.id] });
        await this.update(neighborStory.dataValues.id, {neighbors: [...neighborStory.dataValues.neighbors, newStory.id] });

        return newStory;
      }
    }
  }
};
//const adjacencies = adjacencyModel(sequelize, DataTypes);

module.exports = {
  contentDb: sequelize,
  profileCollection: profileCollection,
  storyCollection: storyCollection,
  //adjacencies: adjacencies,
};
