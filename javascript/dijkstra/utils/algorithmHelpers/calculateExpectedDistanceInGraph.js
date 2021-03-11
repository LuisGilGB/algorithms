const calculateExpectedDistanceInGraph = (graph = {}) => (
  { key: originNodeKey, distance: originNodeDistance },
  { key: destinationNodeKey },
) => originNodeDistance + graph[originNodeKey][destinationNodeKey];

module.exports = calculateExpectedDistanceInGraph;
