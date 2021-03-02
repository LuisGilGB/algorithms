const checkAsError = (inputResponse = {}, errMessage = 'Error') => ({
  ...inputResponse,
  err: true,
  errMessage,
});
exports.checkAsError = checkAsError;
