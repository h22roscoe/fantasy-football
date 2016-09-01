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

var dbconf = require('./config/database');

const ENV = process.env.NODE_ENV;
if (ENV === 'production') {
  mongoose.connect(dbconf.production.uri, {
    user: dbconf.user,
    pass: dbconf.pass
  });
} else {
  mongoose.connect(dbconf.development.uri, {
    user: dbconf.user,
    pass: dbconf.pass
  });
}

app.use(express.static(path.join(__dirname, 'app')));

// Logger
app.use(morgan('dev'));

// Read cookies (needed for auth)
app.use(cookieParser());

// Used to get info from HTML forms
app.use(bodyParser.json());

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
require('./routes')(app, passport);

// To handle any errors that occur in the routes
require('./errors')(app, ENV);

const PORT = process.env.PORT || 8080;
app.listen(PORT, function() {
  console.log('Express app started on port: ' + PORT);
});
