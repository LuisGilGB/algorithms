const dijkstra = (
  graph = {},
  startNodeKey = 'start',
  finishNodeKey = 'finish',
) => {
  return {
    totalDistance: Infinity,
    route: `${startNodeKey} -> ${finishNodeKey}`,
    err: true,
    errMessage: 'Error'
  };
};

module.exports = dijkstra;
