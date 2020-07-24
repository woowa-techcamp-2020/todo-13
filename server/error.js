// error logger
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}
// error response sender
function sendErrorMessage(err, req, res, next) {
  res.status(500).json({ error: err.message });
}

module.exports = {
  logErrors,
  sendErrorMessage,
};
