const hasReachedGraphFinish = (finishNodeKey, nextShortestDistanceNodeKey) => (
  !nextShortestDistanceNodeKey || nextShortestDistanceNodeKey === finishNodeKey
);

module.exports = hasReachedGraphFinish;
