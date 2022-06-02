'use strict';

const { app } = require('./server');
const supertest = require('supertest');
const request = supertest(app);

const graph = require('../test-configs/testGraphData');

describe('Graph Route Tests', () => {
  it('should add a story node to an empty graph', async () => {
    const response = await request.post('/story').send(graph.nodes[0]);

    expect(response.status).toEqual(201);
  });

  it('should add multiple story nodes to the graph without linking a node to itself', async () => {
    for (let i = 1; i < graph.nodes.length; i++) {
      await request.post('/story').send(graph.nodes[i]);
    }
    const node1 = await request.get('/graph/1');
    const node2 = await request.get('/graph/2');
    const node3 = await request.get('/graph/3');
    const node4 = await request.get('/graph/4');
    const node5 = await request.get('/graph/5');

    expect(node1.body[0].neighbors.includes(node1.body[0].id)).toBeFalsy();
    expect(node2.body[0].neighbors.includes(node2.body[0].id)).toBeFalsy();
    expect(node3.body[0].neighbors.includes(node3.body[0].id)).toBeFalsy();
    expect(node4.body[0].neighbors.includes(node4.body[0].id)).toBeFalsy();
    expect(node5.body[0].neighbors.includes(node5.body[0].id)).toBeFalsy();
  });

  it('should retrieve only the nodes at a depth of two or less from the current root', async () => {

    const graph = await request.get('/graph/1');
    console.log(graph.body.length);
    expect(graph.body.length).toBeLessThan(18);
  });
});
