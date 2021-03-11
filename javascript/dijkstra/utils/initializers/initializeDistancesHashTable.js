const { DEFAULT_START_NODE_KEY } = require('../consts');

const initializeDistancesHashTable = (
  graph = {},
  startNodeKey = DEFAULT_START_NODE_KEY,
) => {
  const START_NODE_ZERO_DISTANCE_HASH_MAP = { [startNodeKey]: 0 };

  const setNotStartingNodeDistanceToInfinity = (temp, key) => {
    if (key !== startNodeKey) {
      // eslint-disable-next-line no-param-reassign
      temp[key] = Infinity;
    }
    return temp;
  };

  return Object.keys(graph).reduce(
    setNotStartingNodeDistanceToInfinity,
    START_NODE_ZERO_DISTANCE_HASH_MAP,
  );
};

module.exports = initializeDistancesHashTable;
