const User = require('../db/user'),
  express = require('express'),
  app = express();

app.get('/', function (req, res) {
  res.sendStatus(200);
});

module.exports = app;