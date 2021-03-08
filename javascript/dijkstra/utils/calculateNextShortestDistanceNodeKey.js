const isNotAnEvaluatedNodeYet = require('./isNotAnEvaluatedNodeYet');

const calculateNextShortestDistanceNodeKey = (
  distancesHashMap = {},
  evaluatedNodes = []
) => {
  const updateTempIfNodeIsAtShorterDistance = (temp, nodeKey) => {
    const newNodeIsAtShorterDistanceThanCurrentShortest = () => (
      distancesHashMap[nodeKey] < distancesHashMap[temp]
    );

    const getShorterDistanceBetweenNewNodeAndCurrentDraft = () => (
      newNodeIsAtShorterDistanceThanCurrentShortest() ? nodeKey : temp
    );

    return temp ? getShorterDistanceBetweenNewNodeAndCurrentDraft() : nodeKey;
  };

  return Object.keys(distancesHashMap)
    .filter(isNotAnEvaluatedNodeYet(evaluatedNodes))
    .reduce(updateTempIfNodeIsAtShorterDistance, null);
};

module.exports = calculateNextShortestDistanceNodeKey;
