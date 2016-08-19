module.exports = function(User) {
  function findByUsername(username) {
    return User.findOne({
      username: username
    }).exec();
  }

  return {
    findByUsername: findByUsername
  };
};
