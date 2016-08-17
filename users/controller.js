var User = require('../models/user');

function findByUsername(username) {
  return User.findOne({
    username: username
  }).exec();
}

module.exports = {
  findByUsername: findByUsername
};
