module.exports = function(User) {
  function findByUsername(username) {
    return User.findOne({
      username: username
    }).populate('team').exec();
  }

  function findById(id) {
    return User.findById(id).populate('team').exec();
  }

  function register(username, passwd, cb) {
    User.register(new User({
      username: username
    }), passwd, cb); // Callback takes err and new user
  }

  return {
    findByUsername: findByUsername,
    findById: findById,
    register: register
  };
};
