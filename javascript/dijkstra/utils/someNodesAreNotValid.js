const someNodesAreNotValid = (graph = {}) => (
  Object.keys(graph).some((key) => typeof graph[key] !== 'object')
);

module.exports = someNodesAreNotValid;
