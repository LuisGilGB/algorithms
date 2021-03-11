const { DEFAULT_START_NODE_KEY, DEFAULT_FINISH_NODE_KEY } = require('./consts');
const {
  initializeDistancesHashMap,
  initializeParentsHashMap,
} = require('./initializers');
const {
  calculateNextShortestDistanceNodeKey,
  evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound,
  hasReachedGraphFinish,
} = require('./algorithmHelpers');

const runDijkstraAlgorithm = (
  graph = {},
  startNodeKey = DEFAULT_START_NODE_KEY,
  finishNodeKey = DEFAULT_FINISH_NODE_KEY,
) => {
  const INITIAL_DISTANCES_HASH_TABLE = initializeDistancesHashMap(
    graph,
    startNodeKey,
  );
  const INITIAL_PARENTS_HASH_TABLE = initializeParentsHashMap(startNodeKey);
  const INITIAL_HASH_TABLES = {
    previousDistancesHashMap: INITIAL_DISTANCES_HASH_TABLE,
    previousParentsHashMap: INITIAL_PARENTS_HASH_TABLE,
  };
  const evaluatedNodes = [];

  const runDijkstraIteration = (
    shortestDistanceNodeKey = startNodeKey,
    {
      previousDistancesHashMap = INITIAL_DISTANCES_HASH_TABLE,
      previousParentsHashMap = INITIAL_PARENTS_HASH_TABLE,
    } = INITIAL_HASH_TABLES,
  ) => {
    const currentNodeDistance = (
      previousDistancesHashMap[shortestDistanceNodeKey]
    );
    const {
      distancesHashMap,
      parentsHashMap,
    } = evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound(
      graph,
    )(
      {
        distancesHashMap: previousDistancesHashMap,
        parentsHashMap: previousParentsHashMap,
      },
      shortestDistanceNodeKey,
      currentNodeDistance,
    );
    evaluatedNodes.push(shortestDistanceNodeKey);
    const nextShortestDistanceNodeKey = calculateNextShortestDistanceNodeKey(
      distancesHashMap,
      evaluatedNodes,
    );
    if (hasReachedGraphFinish(finishNodeKey, nextShortestDistanceNodeKey)) {
      return {
        distancesHashMap,
        parentsHashMap,
      };
    }

    return runDijkstraIteration(nextShortestDistanceNodeKey, {
      previousDistancesHashMap: distancesHashMap,
      previousParentsHashMap: parentsHashMap,
    });
  };

  return runDijkstraIteration();
};

module.exports = runDijkstraAlgorithm;
