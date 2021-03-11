const calculateExpectedDistanceInGraph = require('./calculateExpectedDistanceInGraph');
const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = require('./expectedDistanceIsShorterThanCurrentlySavedForDestinationKey');

const evaluateDistancesFromANodeAndUpdateTablesIfShorterDistancesAreFound = (
  graph = {},
) => (
  { distancesHashTable = {}, parentsHashTable = {} },
  currentNodeKey,
  currentNodeDistance,
) => {
  const distancesHashTableDraft = { ...distancesHashTable };
  const parentsHashTableDraft = { ...parentsHashTable };

  const calculateExpectedDistance = calculateExpectedDistanceInGraph(graph);

  const evaluateDestinationNodeAndUpdateTables = (destinationNodeKey) => {
    const expectedDistance = calculateExpectedDistance(
      { key: currentNodeKey, distance: currentNodeDistance },
      { key: destinationNodeKey },
    );
    if (
      expectedDistanceIsShorterThanCurrentlySavedForDestinationKey(
        distancesHashTableDraft,
        expectedDistance,
        destinationNodeKey,
      )
    ) {
      distancesHashTableDraft[destinationNodeKey] = expectedDistance;
      parentsHashTableDraft[destinationNodeKey] = currentNodeKey;
    }
  };

  const evaluateAllDestinationNodesAndUpdateTables = () => (
    Object.keys(graph[currentNodeKey]).forEach(evaluateDestinationNodeAndUpdateTables)
  );

  evaluateAllDestinationNodesAndUpdateTables();

  return {
    distancesHashTable: distancesHashTableDraft,
    parentsHashTable: parentsHashTableDraft,
  };
};

module.exports = evaluateDistancesFromANodeAndUpdateTablesIfShorterDistancesAreFound;
