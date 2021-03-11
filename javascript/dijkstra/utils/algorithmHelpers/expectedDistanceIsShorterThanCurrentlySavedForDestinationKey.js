const expectedDistanceIsShorterThanCurrentlySavedForDestinationKey = (
  distancesHashTable,
  expectedDistance,
  destinationNodeKey,
) => expectedDistance < distancesHashTable[destinationNodeKey];

module.exports = expectedDistanceIsShorterThanCurrentlySavedForDestinationKey;
