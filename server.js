var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');

var PORT = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var configDB = require('./config/database');

var ENV = process.env.NODE_ENV;
if (ENV === 'production') {
  mongoose.connect(configDB.production.uri, {
    user: configDB.user,
    pass: configDB.pass
  });
} else {
  mongoose.connect(configDB.development.uri, {
    user: configDB.user,
    pass: configDB.pass
  });
}

app.use(express.static(path.join(__dirname, 'public', 'app')));

// Logger
app.use(morgan('dev'));

// Read cookies (needed for auth)
app.use(cookieParser());

// Used to get info from HTML forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.set('view engine', 'pug');

// Required for passport
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());

require('./config/passport')(passport);
require('./routes').configure(app, passport);

app.use(function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'app', 'index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// [SH] Catch unauthorised errors
app.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      message: err.name + ': ' + err.message
    });
  }
});

// production error handler
// no stacktraces leaked to user
if (ENV === 'production') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
  });
}

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: err
  });
});

app.listen(PORT, function() {
  console.log('Express app started on port: ' + PORT);
});
