const {
  ERR_MESSAGES,
  DEFAULT_START_NODE_KEY,
  DEFAULT_FINISH_NODE_KEY,
} = require('./utils/consts');
const {
  initializeResponse,
  initializeDistancesHashMap,
  initializeParentsHashMap,
} = require('./utils/initializers');
const checkAsError = require('./utils/checkAsError');
const isValidGraph = require('./utils/isValidGraph');
const someNodesAreNotValid = require('./utils/someNodesAreNotValid');
const calculateNextShortestDistanceNodeKey = require('./utils/calculateNextShortestDistanceNodeKey');
const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = require('./utils/expectedDistanceIsShorterThanCurrentlySavedForDestinationKey');

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
  const distancesHashMap = initializeDistancesHashMap(graph, startNodeKey);
  const parentsHashMap = initializeParentsHashMap(startNodeKey);
  const evaluatedNodes = [];

  const runAlgorithm = (shortestDistanceNodeKey = startNodeKey) => {
    const currentNodeDistance = distancesHashMap[shortestDistanceNodeKey];
    Object.keys(graph[shortestDistanceNodeKey]).forEach(
      (destinationNodeKey) => {
        const expectedDistance =
          currentNodeDistance +
          graph[shortestDistanceNodeKey][destinationNodeKey];
        if (
          expectedDistanceIsShorterThanCurrentlySavedForDestinationKey(
            distancesHashMap,
            expectedDistance,
            destinationNodeKey,
          )
        ) {
          distancesHashMap[destinationNodeKey] = expectedDistance;
          parentsHashMap[destinationNodeKey] = shortestDistanceNodeKey;
        }
      }
    );
    evaluatedNodes.push(shortestDistanceNodeKey);
    const nextShortestDistanceNodeKey = calculateNextShortestDistanceNodeKey(
      distancesHashMap,
      evaluatedNodes
    );
    if (
      !nextShortestDistanceNodeKey ||
      nextShortestDistanceNodeKey === finishNodeKey
    ) {
      return;
    }
    runAlgorithm(nextShortestDistanceNodeKey);
  };

  runAlgorithm();

  const getRoute = (currentRoute = [finishNodeKey]) => {
    const currentNode = currentRoute[0];
    const previousNode = parentsHashMap[currentNode];
    if (!previousNode) {
      return;
    }
    if (previousNode === startNodeKey) {
      return [previousNode, ...currentRoute].join(' -> ');
    }
    return getRoute([previousNode, ...currentRoute]);
  };

  return {
    ...response,
    totalDistance: distancesHashMap[finishNodeKey],
    route: getRoute(),
  };
};

module.exports = dijkstra;
