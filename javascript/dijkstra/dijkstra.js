const { checkAsError } = require('./checkAsError');
const { initializeResponse } = require('./initializeResponse');
const { ERR_MESSAGES } = require('./consts');

const dijkstra = (graph, startNodeKey = 'start', finishNodeKey = 'finish') => {
  const response = initializeResponse(startNodeKey, finishNodeKey);
  if (!graph) {
    return checkAsError(response, ERR_MESSAGES.NO_GRAPH);
  }
  if (graph[startNodeKey] == null || graph[finishNodeKey] == null) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH);
  }
  return response;
};

module.exports = dijkstra;
