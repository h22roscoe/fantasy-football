var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var PORT = process.env.PORT || 3000;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var route = require('./routes.js');

var configDB = require('./config/database.js');

var ENV = process.env.NODE_ENV;
if (ENV === "production") {
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

var passConfigure = require('./config/passport');

passConfigure(passport);

var app = express();

app.use(express.static(__dirname + '/dist'));

// Logger
app.use(morgan('dev'));

// read cookies (needed for auth)
app.use(cookieParser());

// Used to get info from HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// Required for passport
app.use(session({
  secret: 'iaMmAKINGuPmYoWNsECREThERE',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
// Persistent login sessions
app.use(passport.session());
// Use connect-flash for flash messages stored in session
app.use(flash());

route(app, passport);

app.listen(PORT, function() {
  console.log('Express app started on port: ' + PORT)
});
