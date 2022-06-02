'use strict';

const { app } = require('./server');
const supertest = require('supertest');
const request = supertest(app);

const bearerAuth = require('./auth/middleware/bearer.js'); // eslint-disable-line no-unused-vars
const perms = require('./auth/middleware/perms.js'); // eslint-disable-line no-unused-vars

jest.mock('./auth/middleware/bearer.js', () => (req, res, next) => {
  next();
});
jest.mock('./auth/middleware/perms.js', () => (collection) => (req, res, next) => {
  next();
});

const graphSeeds = require('../test-configs/testGraphData');

describe('Graph Route Tests', () => {
  let nodeGraphs = [];

  it('should add a story node to an empty graph', async () => {
    const response = await request.post('/story').send(graphSeeds.nodes[0]);

    expect(response.status).toEqual(201);
  });

  it('should add multiple story nodes to the graph without linking a node to itself', async () => {
    
    for (let i = 0; i < graphSeeds.nodes.length; i++) {
      const storyResponse = await request.post('/story').send(graphSeeds.nodes[i]); // Returns a node aka a story 
      const graphResponse = await request.get(`/graph/${storyResponse.body.id}`); // Returns a graph, which is an array of nodes
      nodeGraphs[i] = graphResponse.body;
    }

    expect(nodeGraphs[0][0].neighbors.includes(nodeGraphs[0][0].id)).toBeFalsy();
    expect(nodeGraphs[1][0].neighbors.includes(nodeGraphs[1][0].id)).toBeFalsy();
    expect(nodeGraphs[2][0].neighbors.includes(nodeGraphs[2][0].id)).toBeFalsy();
    expect(nodeGraphs[3][0].neighbors.includes(nodeGraphs[3][0].id)).toBeFalsy();
    expect(nodeGraphs[4][0].neighbors.includes(nodeGraphs[4][0].id)).toBeFalsy();
  });

  it('should retrieve only the nodes at a depth of two or less from the current root', async () => {

    expect(nodeGraphs[0].length).toBeLessThan(18);
    expect(nodeGraphs[1].length).toBeLessThan(18);
    expect(nodeGraphs[2].length).toBeLessThan(18);
    expect(nodeGraphs[3].length).toBeLessThan(18);
    expect(nodeGraphs[4].length).toBeLessThan(18);
  });
});
