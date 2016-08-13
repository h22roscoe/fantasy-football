var express = require('express');
var app = express();

var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');

var PORT = process.env.PORT || 8080;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var route = require('./routes');
var api = require('./api');

var configDB = require('./config/database');

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

app.use(express.static(__dirname + '/public'));

// Logger
app.use(morgan('dev'));

// Read cookies (needed for auth)
app.use(cookieParser());

// Used to get info from HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.set('view engine', 'pug');

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

route.configure(app, passport);
app.use('/api', api);

app.listen(PORT, function() {
  console.log('Express app started on port: ' + PORT)
});
