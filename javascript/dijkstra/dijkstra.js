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

  const calculateNextShortestDistanceNodeKey = () =>
    Object.keys(distancesDict)
      .filter((nodeKey) => !evaluatedNodes.includes(nodeKey))
      .reduce(
        (temp, nodeKey) =>
          temp
            ? distancesDict[nodeKey] < temp
              ? nodeKey
              : temp
            : nodeKey,
        null
      );

  const runAlgorithm = (shortestDistanceNodeKey = startNodeKey) => {
    const currentNodeDistance = distancesDict[shortestDistanceNodeKey];
    Object.keys(graph[shortestDistanceNodeKey]).forEach(
      (destinationNodeKey) => {
        const expectedDistance =
          currentNodeDistance +
          graph[shortestDistanceNodeKey][destinationNodeKey];
        if (expectedDistance < distancesDict[destinationNodeKey]) {
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

  return {
    ...response,
    totalDistance: distancesDict[finishNodeKey],
  };
};

module.exports = dijkstra;
