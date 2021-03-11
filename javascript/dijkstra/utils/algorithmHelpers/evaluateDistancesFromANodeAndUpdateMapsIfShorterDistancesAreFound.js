const calculateExpectedDistanceInGraph = require('./calculateExpectedDistanceInGraph');
const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = require('./expectedDistanceIsShorterThanCurrentlySavedForDestinationKey');

const evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound = (
  graph = {},
) => (
  { distancesHashMap = {}, parentsHashMap = {} },
  currentNodeKey,
  currentNodeDistance,
) => {
  const distancesHashTableDraft = { ...distancesHashMap };
  const parentsHashTableDraft = { ...parentsHashMap };

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
    distancesHashMap: distancesHashTableDraft,
    parentsHashMap: parentsHashTableDraft,
  };
};

module.exports = evaluateDistancesFromANodeAndUpdateMapsIfShorterDistancesAreFound;
