const express = require('express'),
  bodyParser = require('body-parser'),
  auth = require('./auth_middleware'),
  app = express();

module.exports = app;