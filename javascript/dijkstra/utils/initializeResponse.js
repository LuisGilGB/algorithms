const initializeResponse = (startNodeKey, finishNodeKey) => ({
  totalDistance: Infinity,
  route: `${startNodeKey} -> ${finishNodeKey}`,
  err: false,
  errMessage: null,
});

module.exports = initializeResponse;
