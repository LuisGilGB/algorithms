const isNotAnEvaluatedNodeYet = require('./isNotAnEvaluatedNodeYet');

const calculateNextShortestDistanceNodeKey = (
  distancesHashMap = {},
  evaluatedNodes = [],
) => {
  const updateTempIfNodeIsAtShorterDistance = (temp, nodeKey) => {
    const newNodeIsAtShorterDistanceThanCurrentShortest = () => (
      distancesHashMap[nodeKey] < distancesHashMap[temp]
    );

    const getShorterDistanceNodeBetweenNewNodeAndCurrentDraft = () => (
      newNodeIsAtShorterDistanceThanCurrentShortest() ? nodeKey : temp
    );

    const returnNewNodeIfNoDraftOrCompareToGetTheShorterDistanceNode = () => (
      temp ? getShorterDistanceNodeBetweenNewNodeAndCurrentDraft() : nodeKey
    );

    return returnNewNodeIfNoDraftOrCompareToGetTheShorterDistanceNode();
  };

  return Object.keys(distancesHashMap)
    .filter(isNotAnEvaluatedNodeYet(evaluatedNodes))
    .reduce(updateTempIfNodeIsAtShorterDistance, null);
};

module.exports = calculateNextShortestDistanceNodeKey;
