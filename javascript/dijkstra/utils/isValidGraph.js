const { DEFAULT_START_NODE_KEY, DEFAULT_FINISH_NODE_KEY } = require('./consts');

const isValidGraph = (
  graph = {},
  startNodeKey = DEFAULT_START_NODE_KEY,
  finishNodeKey = DEFAULT_FINISH_NODE_KEY,
) => graph[startNodeKey] != null && graph[finishNodeKey] != null;

module.exports = isValidGraph;
