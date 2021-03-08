const isNotAnEvaluatedNodeYet = (evaluatedNodes = []) => (nodeKey) => (
  !evaluatedNodes.includes(nodeKey)
);

module.exports = isNotAnEvaluatedNodeYet;
