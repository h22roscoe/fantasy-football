var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

const ENV = process.env.NODE_ENV;
const DB_CONF = require('./config/database');
if (ENV === 'production') {
  mongoose.connect(DB_CONF.production.uri, {
    user: DB_CONF.user,
    pass: DB_CONF.pass
  });
} else {
  mongoose.connect(DB_CONF.development.uri, {
    user: DB_CONF.user,
    pass: DB_CONF.pass
  });
}

app.use(express.static(path.join(__dirname, 'app')));
app.use(favicon(path.join(__dirname, 'app', 'favicon', 'favicon.ico')));

// Logger
app.use(morgan('dev'));

// Read cookies (needed for auth)
app.use(cookieParser());

// Used to get info from HTML forms
app.use(bodyParser.json());

var sess = {
  secret: process.env.SECRET,
  resave: false,
  cookie: {
    httpOnly: false
  },
  saveUninitialized: false
};

// Required for passport
app.use(session(sess));

app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());

require('./config/passport')(passport);

// Set up the routes
app.use(require('./router')(passport));

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Express app started on port: ' + PORT);
});
