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

  const calculateExpectedDistance = (
    { key: originNodeKey, distance: originNodeDistance },
    { key: destinationNodeKey },
  ) => originNodeDistance + graph[originNodeKey][destinationNodeKey];

  const evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound = (
    currentNodeKey,
    currentNodeDistance,
  ) => (
    Object.keys(graph[currentNodeKey]).forEach((destinationNodeKey) => {
      const expectedDistance = calculateExpectedDistance(
        { key: currentNodeKey, distance: currentNodeDistance },
        { key: destinationNodeKey },
      );
      if (
        expectedDistanceIsShorterThanCurrentlySavedForDestinationKey(
          distancesHashMap,
          expectedDistance,
          destinationNodeKey,
        )
      ) {
        distancesHashMap[destinationNodeKey] = expectedDistance;
        parentsHashMap[destinationNodeKey] = currentNodeKey;
      }
    })
  );

  const hasReachedGraphFinish = (nextShortestDistanceNodeKey) => (
    !nextShortestDistanceNodeKey
    || nextShortestDistanceNodeKey === finishNodeKey
  );

  const runDijkstraIteration = (shortestDistanceNodeKey = startNodeKey) => {
    const currentNodeDistance = distancesHashMap[shortestDistanceNodeKey];
    evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound(
      shortestDistanceNodeKey,
      currentNodeDistance,
    );
    evaluatedNodes.push(shortestDistanceNodeKey);
    const nextShortestDistanceNodeKey = calculateNextShortestDistanceNodeKey(
      distancesHashMap,
      evaluatedNodes,
    );
    if (hasReachedGraphFinish(nextShortestDistanceNodeKey)) {
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
