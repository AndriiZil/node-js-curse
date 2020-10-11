function setCookie(req, res, next) {
  res.set('Set-Cookie', 'asd=asdfghjkl');
  next();
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.send({ error: err });
}

module.exports = {
  setCookie,
  errorHandler
};
