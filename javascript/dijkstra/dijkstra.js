const { checkAsError } = require('./utils/checkAsError');
const { initializeResponse } = require('./utils/initializeResponse');
const { ERR_MESSAGES } = require('./utils/consts');

const dijkstra = (graph, startNodeKey = 'start', finishNodeKey = 'finish') => {
  const response = initializeResponse(startNodeKey, finishNodeKey);
  if (!graph) {
    return checkAsError(response, ERR_MESSAGES.NO_GRAPH);
  }
  if (graph[startNodeKey] == null || graph[finishNodeKey] == null) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH);
  }
  if (Object.keys(graph).some((key) => typeof graph[key] !== 'object')) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH_NODE);
  }
  return response;
};

module.exports = dijkstra;
