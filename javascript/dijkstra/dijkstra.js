const {
  ERR_MESSAGES,
  DEFAULT_START_NODE_KEY,
  DEFAULT_FINISH_NODE_KEY,
} = require('./utils/consts');
const { initializeResponse } = require('./utils/initializers');
const checkAsError = require('./utils/checkAsError');
const isValidGraph = require('./utils/isValidGraph');
const someNodesAreNotValid = require('./utils/someNodesAreNotValid');
const runDijkstraAlgorithm = require('./utils/runDijkstraAlgorithm');

const dijkstra = (
  graph,
  startNodeKey = DEFAULT_START_NODE_KEY,
  finishNodeKey = DEFAULT_FINISH_NODE_KEY,
) => {
  const response = initializeResponse(startNodeKey, finishNodeKey);
  if (!graph) {
    return checkAsError(response, ERR_MESSAGES.NO_GRAPH);
  }
  if (!isValidGraph(graph, startNodeKey, finishNodeKey)) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH);
  }
  if (someNodesAreNotValid(graph)) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH_NODE);
  }

  const { distancesHashTable, parentsHashTable } = runDijkstraAlgorithm(
    graph,
    startNodeKey,
    finishNodeKey,
  );

  const getRoute = (currentRoute = [finishNodeKey]) => {
    const currentNode = currentRoute[0];
    const previousNode = parentsHashTable[currentNode];
    if (!previousNode) {
      return null;
    }
    if (previousNode === startNodeKey) {
      return [previousNode, ...currentRoute].join(' -> ');
    }
    return getRoute([previousNode, ...currentRoute]);
  };

  return {
    ...response,
    totalDistance: distancesHashTable[finishNodeKey],
    route: getRoute(),
  };
};

module.exports = dijkstra;
