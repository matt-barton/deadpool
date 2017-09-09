
const User = require('../db/user'),
  express = require('express'),
  app = express(),
  isAuth = require('../auth_middleware');

app.get('/', isAuth, function (req, res) {
  return User.findOne({ _id: req.user._id })
    .then(user => { res.json(user); });
});

app.post('/username', isAuth, function (req, res) {
  User.findOneAndUpdate({ _id: req.user._id }, { username: req.body.username }, { returnNewDocument: true })
    .then(function (userDoc) { 
      return req.login(userDoc, function () {
        res.sendStatus(200);
      });
    })
    .catch(function () { res.sendStatus(409); });
  
});

module.exports = app;