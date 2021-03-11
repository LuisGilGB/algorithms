const calculateExpectedDistanceInGraph = require('./calculateExpectedDistanceInGraph');
const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = require('./expectedDistanceIsShorterThanCurrentlySavedForDestinationKey');

const evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound = (
  graph = {},
) => (
  { distancesHashTable = {}, parentsHashTable = {} },
  currentNodeKey,
  currentNodeDistance,
) => {
  const distancesHashTableDraft = { ...distancesHashTable };
  const parentsHashTableDraft = { ...parentsHashTable };

  const calculateExpectedDistance = calculateExpectedDistanceInGraph(graph);

  Object.keys(graph[currentNodeKey]).forEach((destinationNodeKey) => {
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
  });

  return {
    distancesHashTable: distancesHashTableDraft,
    parentsHashTable: parentsHashTableDraft,
  };
};

module.exports = evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound;
