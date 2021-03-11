const { DEFAULT_START_NODE_KEY } = require('../consts');

const initializeParentsHashTable = (startNodeKey = DEFAULT_START_NODE_KEY) => ({
  [startNodeKey]: 0,
});

module.exports = initializeParentsHashTable;
