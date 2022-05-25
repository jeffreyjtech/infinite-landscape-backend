'use strict';

const { app } = require('../server');
const supertest = require('supertest');
const request = supertest(app);

const graph = {
  nodes: [
    {
      //id: 1,
      label: 'The first room',
      username: 'micha',
      penName: 'Michanations',
      summary: 'A simple room with information placards on one wall.',
      description: 'This room is completely unadorned, save for a gigantic series of information diagrams on the east wall. There is a single door leading out of the room.',
      group: 'TUTORIAL',
      color: 'blue',
      tooltips: {
        information: 'You can hover over words like this to get more information',
        door: 'This door leads to the next room. Hover over that room in the map view to see what might be inside.',
      },
    },
    {
      //id: 2,
      label: 'The second room',
      username: 'micha',
      penName: 'Michanations',
      summary: 'An elaborately decorated room.',
      description: 'This room is festooned with gaudy decorations. Nearly every surface is covered with some kind of intricate pattern.',
      group: 'TUTORIAL',
      color: 'blue',
      tooltips: {
        decorations: 'Sometimes there will be hidden information in these descriptions',
        pattern: 'One repeated motif is a series of colors arranged in a circle, each color signifying a different region of the landscape.',
      },
    },
    {
      //id: 3,
      label: 'The third room',
      username: 'micha',
      penName: 'Michanations',
      summary: 'A simple room with information placards on one wall.',
      description: 'This room is completely unadorned, save for a gigantic series of information diagrams on the east wall. There is a single door leading out of the room.',
      group: 'TUTORIAL',
      color: 'green',
      tooltips: {
        information: 'You can hover over words like this to get more information',
        door: 'This door leads to the next room. Hover over that room in the map view to see what might be inside.',
      },
    },
    {
      //id: 4,
      label: 'The other third room',
      username: 'micha',
      penName: 'Michanations',
      summary: 'A simple room with information placards on one wall.',
      description: 'This room is completely unadorned, save for a gigantic series of information diagrams on the east wall. There is a single door leading out of the room.',
      group: 'TUTORIAL',
      color: 'purple',
      tooltips: {
        information: 'You can hover over words like this to get more information',
        door: 'This door leads to the next room. Hover over that room in the map view to see what might be inside.',
      },
    },
    {
      //id: 5,
      label: 'A room too far',
      username: 'micha',
      penName: 'Michanations',
      summary: 'This room shouldn\'t be visible from the first room',
      description: 'This room is only theoretical.',
      group: 'VOID',
      color: 'black',
      tooltips: {
        theoretical: 'How are you even reading this?',
      },
    },
  ],
  adjacencies: [
    { 10001: [10002] },
    { 10002: [10001, 10003, 10004] },
    { 10003: [10002] },
    { 10004: [10003, 10005] },
  ],
};

describe('Graph Route Tests', () => {
  it('should add a story node to an empty graph', async () => {
    const story = await request.post('/story').send(graph.nodes[0]);
    console.log(story.status);
    const response = await request.post('/graph').send(graph.nodes[0]);

    expect(response.status).toEqual(204);
  });

  // it('should add multiple story nodes to the graph', async () => {
  //   for (let i = 1; i < graph.nodes.length; i++) {
  //     await request.post('/story').send(graph.nodes[i]);
  //     await request.post('/graph').send(graph.nodes[i]);
  //   }
  //   const adjacencies = await request.get('/graph/1');

  //   //console.log('testing for adj', adjacencies.body);

  //   expect(true).toEqual(false);
  // });

  // it('should retrieve only the nodes at a depth of two or less from the current root', () => {
  //   expect(true).toEqual(false);
  // });
});
