// error logger
function logErrors(err, req, res, next) {
  console.error(err);
  next(err);
}
// error response sender
function sendErrors(err, req, res, next) {
  res.json({ message: err.message });
}

module.exports = {
  logErrors,
  sendErrors,
};
