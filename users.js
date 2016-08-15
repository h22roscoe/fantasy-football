var express = require('express');

var User = require('./models/user');

var router = express.Router(); // TODO: Use this for looking at other users
                               // May not need this as well.

function getUserById(id) {
  var promise = User.find({
    id: id
  }).exec();
  return promise;
}

module.exports = {
  getUserById: getUserById
};
