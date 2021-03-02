const BASIC_CASE_GRAPH = { start: { finish: 1 }, finish: {} };

const BASIC_CASE_EXPECTED_RESPONSE = {
  totalDistance: 1,
  route: 'start -> finish',
  err: false,
  errMessage: null,
};

const THREE_NODES_CASE_GRAPH = {
  start: {
    middleNode: 1,
  },
  middleNode: {
    finish: 1,
  },
  finish: {},
};

const THREE_NODES_CASE_EXPECTED_RESPONSE = {
  totalDistance: 2,
  route: 'start -> middleNode -> finish',
  err: false,
  errMessage: null,
};

const FOUR_NODES_CASE_GRAPH = {
  start: {
    a: 6,
    b: 2,
  },
  a: {
    finish: 1,
  },
  b: {
    a: 3,
    finish: 5,
  },
  finish: {},
};

const FOUR_NODES_CASE_EXPECTED_RESPONSE = {
  totalDistance: 6,
  route: 'start -> b -> a -> finish',
  err: false,
  errMessage: null,
};

const SIX_NODES_CASE_GRAPH = {
  start: {
    a: 5,
    b: 2,
  },
  a: {
    c: 4,
    d: 2,
  },
  b: {
    a: 8,
    d: 7,
  },
  c: {
    finish: 3,
    d: 6,
  },
  d: {
    finish: 1,
  },
  finish: {},
};

const SIX_NODES_CASE_EXPECTED_RESPONSE = {
  totalDistance: 8,
  route: 'start -> a -> d -> finish',
  err: false,
  errMessage: null,
};

const ALIASED_SIX_NODES_CASE_GRAPH = {
  book: {
    lp: 5,
    poster: 0,
  },
  lp: {
    bassGuitar: 15,
    drums: 20,
  },
  poster: {
    bassGuitar: 30,
    drums: 35,
  },
  bassGuitar: {
    piano: 20,
  },
  drums: {
    piano: 10,
  },
  piano: {},
};

const ALIASED_SIX_NODES_CASE_EXPECTED_RESPONSE = {
  totalDistance: 35,
  route: 'book -> lp -> drums -> piano',
  err: false,
  errMessage: null,
};

module.exports = {
  BASIC_CASE_GRAPH,
  BASIC_CASE_EXPECTED_RESPONSE,
  THREE_NODES_CASE_GRAPH,
  THREE_NODES_CASE_EXPECTED_RESPONSE,
  FOUR_NODES_CASE_GRAPH,
  FOUR_NODES_CASE_EXPECTED_RESPONSE,
  SIX_NODES_CASE_GRAPH,
  SIX_NODES_CASE_EXPECTED_RESPONSE,
  ALIASED_SIX_NODES_CASE_GRAPH,
  ALIASED_SIX_NODES_CASE_EXPECTED_RESPONSE,
};
