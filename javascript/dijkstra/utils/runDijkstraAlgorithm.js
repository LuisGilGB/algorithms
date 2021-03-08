const { DEFAULT_START_NODE_KEY, DEFAULT_FINISH_NODE_KEY } = require('./consts');
const calculateNextShortestDistanceNodeKey = require('./calculateNextShortestDistanceNodeKey');
const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = require('./expectedDistanceIsShorterThanCurrentlySavedForDestinationKey');
const {
  initializeDistancesHashMap,
  initializeParentsHashMap,
} = require('./initializers');

const runDijkstraAlgorithm = (
  graph = {},
  startNodeKey = DEFAULT_START_NODE_KEY,
  finishNodeKey = DEFAULT_FINISH_NODE_KEY,
) => {
  const distancesHashMap = initializeDistancesHashMap(graph, startNodeKey);
  const parentsHashMap = initializeParentsHashMap(startNodeKey);
  const evaluatedNodes = [];

  const runDijkstraIteration = (shortestDistanceNodeKey = startNodeKey) => {
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
            destinationNodeKey
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
      evaluatedNodes,
    );
    if (
      !nextShortestDistanceNodeKey ||
      nextShortestDistanceNodeKey === finishNodeKey
    ) {
      return {
        distancesHashMap,
        parentsHashMap,
      };
    }
    return runDijkstraIteration(nextShortestDistanceNodeKey);
  };

  return runDijkstraIteration();
};

module.exports = runDijkstraAlgorithm;
