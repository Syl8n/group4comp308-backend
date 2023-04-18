const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const auth = require('../app/utils/auth')

module.exports = function (app) {

  app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
  }));
  app.use(helmet());
  app.use(cookieParser());
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(morgan('combined'));
    app.use(compression());
  }

  app.use(cookieParser());

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  require('./session')(app);

  app.use('/', auth);

  require('../app/routes/index.route')(app);

  app.use(express.static('./public'));

  return app;
}