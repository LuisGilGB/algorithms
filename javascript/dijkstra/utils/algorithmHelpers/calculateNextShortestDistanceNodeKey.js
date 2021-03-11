const isNotAnEvaluatedNodeYet = require('./isNotAnEvaluatedNodeYet');

const calculateNextShortestDistanceNodeKey = (
  distancesHashTable = {},
  evaluatedNodes = [],
) => {
  const updateTempIfNodeIsAtShorterDistance = (temp, nodeKey) => {
    const newNodeIsAtShorterDistanceThanCurrentShortest = () => (
      distancesHashTable[nodeKey] < distancesHashTable[temp]
    );

    const getShorterDistanceNodeBetweenNewNodeAndCurrentDraft = () => (
      newNodeIsAtShorterDistanceThanCurrentShortest() ? nodeKey : temp
    );

    const returnNewNodeIfNoDraftOrCompareToGetTheShorterDistanceNode = () => (
      temp ? getShorterDistanceNodeBetweenNewNodeAndCurrentDraft() : nodeKey
    );

    return returnNewNodeIfNoDraftOrCompareToGetTheShorterDistanceNode();
  };

  return Object.keys(distancesHashTable)
    .filter(isNotAnEvaluatedNodeYet(evaluatedNodes))
    .reduce(updateTempIfNodeIsAtShorterDistance, null);
};

module.exports = calculateNextShortestDistanceNodeKey;
