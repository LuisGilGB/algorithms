const { DEFAULT_START_NODE_KEY, DEFAULT_FINISH_NODE_KEY } = require('./consts');
const {
  initializeDistancesHashTable,
  initializeParentsHashTable,
} = require('./initializers');
const {
  calculateNextShortestDistanceNodeKey,
  evaluateDistancesFromANodeAndUpdateTablesIfShorterDistancesAreFound,
  hasReachedGraphFinish,
} = require('./algorithmHelpers');

const runDijkstraAlgorithm = (
  graph = {},
  startNodeKey = DEFAULT_START_NODE_KEY,
  finishNodeKey = DEFAULT_FINISH_NODE_KEY,
) => {
  const INITIAL_DISTANCES_HASH_TABLE = initializeDistancesHashTable(
    graph,
    startNodeKey,
  );
  const INITIAL_PARENTS_HASH_TABLE = initializeParentsHashTable(startNodeKey);
  const INITIAL_HASH_TABLES = {
    previousDistancesHashTable: INITIAL_DISTANCES_HASH_TABLE,
    previousParentsHashTable: INITIAL_PARENTS_HASH_TABLE,
  };
  const evaluatedNodes = [];
  const graphDistancesEvaluatorAndUpdator = (
    evaluateDistancesFromANodeAndUpdateTablesIfShorterDistancesAreFound(
      graph,
    )
  );

  const runDijkstraIteration = (
    shortestDistanceNodeKey = startNodeKey,
    {
      previousDistancesHashTable = INITIAL_DISTANCES_HASH_TABLE,
      previousParentsHashTable = INITIAL_PARENTS_HASH_TABLE,
    } = INITIAL_HASH_TABLES,
  ) => {
    const currentNodeDistance = (
      previousDistancesHashTable[shortestDistanceNodeKey]
    );
    const {
      distancesHashTable,
      parentsHashTable,
    } = graphDistancesEvaluatorAndUpdator(
      {
        distancesHashTable: previousDistancesHashTable,
        parentsHashTable: previousParentsHashTable,
      },
      shortestDistanceNodeKey,
      currentNodeDistance,
    );
    evaluatedNodes.push(shortestDistanceNodeKey);

    const nextShortestDistanceNodeKey = calculateNextShortestDistanceNodeKey(
      distancesHashTable,
      evaluatedNodes,
    );
    if (hasReachedGraphFinish(finishNodeKey, nextShortestDistanceNodeKey)) {
      return {
        distancesHashTable,
        parentsHashTable,
      };
    }

    return runDijkstraIteration(nextShortestDistanceNodeKey, {
      previousDistancesHashTable: distancesHashTable,
      previousParentsHashTable: parentsHashTable,
    });
  };

  return runDijkstraIteration();
};

module.exports = runDijkstraAlgorithm;
