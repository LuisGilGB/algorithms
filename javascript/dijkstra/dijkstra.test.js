const should = require('chai').should();
const { ERR_MESSAGES } = require('./consts');
const dijkstra = require('./dijkstra');

describe('Dijkstra function is returning something', () => {
  it('Dijkstra should exist', () => {
    should.exist(dijkstra);
  });
  it('Dijkstra should be a function', () => {
    dijkstra.should.be.a('function');
  });
  it('Dijkstra should return an object', () => {
    dijkstra().should.be.an('object');
  });
  it('Dijkstra should return a totalDistance property that is a number', () => {
    dijkstra().should.have.property('totalDistance').that.is.a('number');
  });
  it('Dijkstra should return a route property that is a string', () => {
    dijkstra().should.have.property('route').that.is.a('string');
  });
  it('Dijkstra should return an err property that is true when no arguments are given', () => {
    dijkstra().should.have.property('err').to.equals(true);
  });
  it('Dijkstra should return an errMessage property that is a string when no arguments are given', () => {
    dijkstra().should.have.property('errMessage').that.is.a('string');
  });
});

describe('Dijkstra function requires essential parameters', () => {
  it('Dijkstra returns an err property that is true when no graph argument is given', () => {
    dijkstra().should.have.property('err').to.equals(true);
  });
  it('Dijkstra returns no graph error message as errMessage when no graph is provided as an argument', () => {
    dijkstra()
      .should.have.property('errMessage')
      .to.equals(ERR_MESSAGES.NO_GRAPH);
  });
  it('Dijkstra returns an err property that is true when the given graph does not have the start node key', () => {
    dijkstra({}).should.have.property('err').to.equals(true);
  });
  it('Dijkstra returns not valid graph error message as errMessage when the given graph does not have the start node key', () => {
    dijkstra({})
      .should.have.property('errMessage')
      .to.equals(ERR_MESSAGES.NOT_VALID_GRAPH);
  });
  it('Dijkstra returns an err property that is true when the given graph does not have the finish node key', () => {
    dijkstra({}).should.have.property('err').to.equals(true);
  });
  it('Dijkstra returns not valid graph error message as errMessage when the given graph does not have the finish node key', () => {
    dijkstra({ start: 0 })
      .should.have.property('errMessage')
      .to.equals(ERR_MESSAGES.NOT_VALID_GRAPH);
  });
});
