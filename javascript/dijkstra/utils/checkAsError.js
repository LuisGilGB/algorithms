const checkAsError = (inputResponse = {}, errMessage = 'Error') => ({
  ...inputResponse,
  err: true,
  errMessage,
});

module.exports = checkAsError;
