const initializeResponse = (startNodeKey, finishNodeKey) => ({
  totalDistance: Infinity,
  route: `${startNodeKey} -> ${finishNodeKey}`,
  err: true,
  errMessage: 'Error',
});
exports.initializeResponse = initializeResponse;
