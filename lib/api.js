const express = require('express'),
  users = require('./user/user_controller'),
  app = express();

app.use('/user', users);

module.exports = app;