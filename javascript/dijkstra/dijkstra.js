const { checkAsError } = require('./utils/checkAsError');
const { initializeResponse } = require('./utils/initializeResponse');
const { ERR_MESSAGES } = require('./utils/consts');
const isValidGraph = require('./utils/isValidGraph');

const dijkstra = (graph, startNodeKey = 'start', finishNodeKey = 'finish') => {
  const response = initializeResponse(startNodeKey, finishNodeKey);
  if (!graph) {
    return checkAsError(response, ERR_MESSAGES.NO_GRAPH);
  }
  if (!isValidGraph(graph, startNodeKey, finishNodeKey)) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH);
  }
  if (Object.keys(graph).some((key) => typeof graph[key] !== 'object')) {
    return checkAsError(response, ERR_MESSAGES.NOT_VALID_GRAPH_NODE);
  }
  const distancesDict = Object.keys(graph).reduce(
    (temp, key) => {
      if (key !== startNodeKey) {
        // eslint-disable-next-line no-param-reassign
        temp[key] = Infinity;
      }
      return temp;
    },
    // eslint-disable-next-line comma-dangle
    { [startNodeKey]: 0 }
  );
  const parentsDict = { [startNodeKey]: 0 };
  const evaluatedNodes = [];

  const isNotAnEvaluatedNodeYet = (nodeKey) =>
    !evaluatedNodes.includes(nodeKey);

  const updateTempIfNodeIsAtShorterDistance = (temp, nodeKey) =>
    temp
      ? distancesDict[nodeKey] < distancesDict[temp]
        ? nodeKey
        : temp
      : nodeKey;

  const calculateNextShortestDistanceNodeKey = () =>
    Object.keys(distancesDict)
      .filter(isNotAnEvaluatedNodeYet)
      .reduce(updateTempIfNodeIsAtShorterDistance, null);

  const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = (
    expectedDistance,
    destinationNodeKey
  ) => expectedDistance < distancesDict[destinationNodeKey];

  const runAlgorithm = (shortestDistanceNodeKey = startNodeKey) => {
    const currentNodeDistance = distancesDict[shortestDistanceNodeKey];
    Object.keys(graph[shortestDistanceNodeKey]).forEach(
      (destinationNodeKey) => {
        const expectedDistance =
          currentNodeDistance +
          graph[shortestDistanceNodeKey][destinationNodeKey];
        if (
          expectedDistanceIsShorterThanCurrentlySavedForDestinationKey(
            expectedDistance,
            destinationNodeKey
          )
        ) {
          distancesDict[destinationNodeKey] = expectedDistance;
          parentsDict[destinationNodeKey] = shortestDistanceNodeKey;
        }
      }
    );
    evaluatedNodes.push(shortestDistanceNodeKey);
    const nextShortestDistanceNodeKey = calculateNextShortestDistanceNodeKey();
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
    const previousNode = parentsDict[currentNode];
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
    totalDistance: distancesDict[finishNodeKey],
    route: getRoute(),
  };
};

module.exports = dijkstra;
