const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = (
  distancesHashMap,
  expectedDistance,
  destinationNodeKey,
) => expectedDistance < distancesHashMap[destinationNodeKey];

module.exports = expectedDistanceIsShorterThanCurrentlySavedForDestinationKey;
