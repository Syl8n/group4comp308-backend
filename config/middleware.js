const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

module.exports = function (app) {

  app.use(cors());
  app.use(helmet());
  app.use(cookieParser());
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(compression());
  }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  require('./session')(app);

  require('../app/routes/index.route')(app);

  app.use(express.static('./public'));

  return app;
}