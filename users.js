var express = require('express');

var User = require('./models/user');

var router = express.Router(); // TODO: Use this for looking at other users
// May not need this as well.

function getUserByUsername(username) {
  var promise = User.findOne({
    username: username
  }).exec();
  return promise;
}

module.exports = {
  getUserByUsername: getUserByUsername
};
