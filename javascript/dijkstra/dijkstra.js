const dijkstra = (
  graph = {},
  startNodeKey = 'start',
  finishNodeKey = 'finish',
) => {
  return {
    totalDistance: Infinity,
    route: `${startNodeKey} -> ${finishNodeKey}`,
    err: false,
  };
};

module.exports = dijkstra;
