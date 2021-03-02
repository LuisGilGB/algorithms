const should = require('chai').should();
const dijkstra = require('./dijkstra');

describe('Dijkstra function is working', () => {
  it('Dijkstra should exist', () => {
    should.exist(dijkstra);
  });
  it('Dijkstra should be a function', () => {
    dijkstra.should.be.a('function');
  });
});
