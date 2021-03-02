const should = require('chai').should();
const dijkstra = require('./dijkstra');
const { ERR_MESSAGES } = require('./utils/consts');
const {
  BASIC_CASE_GRAPH,
  BASIC_CASE_EXPECTED_RESPONSE,
  THREE_NODES_CASE_GRAPH,
  THREE_NODES_CASE_EXPECTED_RESPONSE,
  FOUR_NODES_CASE_GRAPH,
  FOUR_NODES_CASE_EXPECTED_RESPONSE,
} = require('./testUtils/consts');

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
    dijkstra().should.have.property('err').to.equal(true);
  });
  it('Dijkstra should return an errMessage property that is a string when no arguments are given', () => {
    dijkstra().should.have.property('errMessage').that.is.a('string');
  });
});

describe('Dijkstra function requires essential parameters', () => {
  it('Dijkstra returns an err property that is true when no graph argument is given', () => {
    dijkstra().should.have.property('err').to.equal(true);
  });
  it('Dijkstra returns no graph error message as errMessage when no graph is provided as an argument', () => {
    dijkstra()
      .should.have.property('errMessage')
      .to.equal(ERR_MESSAGES.NO_GRAPH);
  });
  it('Dijkstra returns an err property that is true when the given graph does not have the start node key', () => {
    dijkstra({}).should.have.property('err').to.equal(true);
  });
  it('Dijkstra returns not valid graph error as errMessage when the given graph does not have the start node key', () => {
    dijkstra({})
      .should.have.property('errMessage')
      .to.equal(ERR_MESSAGES.NOT_VALID_GRAPH);
  });
  it('Dijkstra returns an err property that is true when the given graph does not have the finish node key', () => {
    dijkstra({}).should.have.property('err').to.equal(true);
  });
  it('Dijkstra returns not valid graph error as errMessage when the given graph does not have the finish node key', () => {
    dijkstra({ start: 0 })
      .should.have.property('errMessage')
      .to.equal(ERR_MESSAGES.NOT_VALID_GRAPH);
  });
  it('Dijkstra returns an err property that is true when the given graph has a start node that does not have the graph node structure ', () => {
    dijkstra({
      start: 'This is not a graph node',
      finish: 'This is not a graph node',
    })
      .should.have.property('err')
      .to.equal(true);
  });
  it('Dijkstra returns not valid graph node error as errMessage when the given graph has a start node that does not have the graph node structure ', () => {
    dijkstra({
      start: 'This is not a graph node',
      finish: 'This is not a graph node',
    })
      .should.have.property('errMessage')
      .to.equal(ERR_MESSAGES.NOT_VALID_GRAPH_NODE);
  });
  it('Dijkstra returns an err property that is true when the given graph has a finish node that does not have the graph node structure ', () => {
    dijkstra({
      start: { finish: 2 },
      finish: 'This is not a graph node',
    })
      .should.have.property('err')
      .to.equal(true);
  });
  it('Dijkstra returns not valid graph node error as errMessage when the given graph has a finish node that does not have the graph node structure ', () => {
    dijkstra({
      start: { finish: 2 },
      finish: 'This is not a graph node',
    })
      .should.have.property('errMessage')
      .to.equal(ERR_MESSAGES.NOT_VALID_GRAPH_NODE);
  });
  it('Dijkstra returns an err property that is true when the given graph has a node that does not have the graph node structure ', () => {
    dijkstra({
      start: { aNode: 1, finish: 2 },
      aNode: 'This is not a graph node',
      finish: {},
    })
      .should.have.property('err')
      .to.equal(true);
  });
  it('Dijkstra returns not valid graph node error as errMessage when the given graph has a node that does not have the graph node structure ', () => {
    dijkstra({
      start: { aNode: 1, finish: 2 },
      aNode: 'This is not a graph node',
      finish: {},
    })
      .should.have.property('errMessage')
      .to.equal(ERR_MESSAGES.NOT_VALID_GRAPH_NODE);
  });
});

describe('Dijkstra returns a valid response when using with a valid graph as input', () => {
  it('Dijkstra returns a valid response on the basic graph case', () => {
    dijkstra(BASIC_CASE_GRAPH).should.be.eql(BASIC_CASE_EXPECTED_RESPONSE);
  });
  it('Dijkstra returns a valid response on the 3 nodes graph case', () => {
    dijkstra(THREE_NODES_CASE_GRAPH).should.be.eql(THREE_NODES_CASE_EXPECTED_RESPONSE);
  });
  it('Dijkstra returns a valid response on the 4 nodes graph case', () => {
    dijkstra(FOUR_NODES_CASE_GRAPH).should.be.eql(FOUR_NODES_CASE_EXPECTED_RESPONSE);
  });
  it('Dijkstra returns a valid response on the 6 nodes graph case', () => {
    dijkstra(FOUR_NODES_CASE_GRAPH).should.be.eql(FOUR_NODES_CASE_EXPECTED_RESPONSE);
  });
});
