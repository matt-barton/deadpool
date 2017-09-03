module.exports = (req, res, next) => {
  if (req.user && req.user._id) return next();
  res.redirect('/login');
};