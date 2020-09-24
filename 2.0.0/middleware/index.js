function setCookie(req, res, next) {
  res.set('Set-Cookie', 'asd=asdfghjkl');
  next();
}

module.exports = {
  setCookie
};
