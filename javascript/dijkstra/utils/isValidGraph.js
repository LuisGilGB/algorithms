const isValidGraph = (graph = {}, startNodeKey = 'start', finishNodeKey = 'finish') => (
  graph[startNodeKey] != null && graph[finishNodeKey] != null
);

module.exports = isValidGraph;
