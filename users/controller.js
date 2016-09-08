module.exports = function(User) {
  function findByUsername(username) {
    return User.findOne({
      username: username
    }).exec();
  }

  function registerUser(username, passwd, cb) {
    User.register(new User({
      username: username
    }), passwd, cb); // Callback takes err and new user
  }

  function addPlayer(user, name, position, xi) {
    user.name = name;
    user.admin = false;
    user.position = position;
    user.xi = parseInt(xi);
    user.appearances = 0;
    user.goals = 0;
    user.owngoals = 0;
    user.assists = 0;
    user.cleansheets = 0;
    user.motms = 0;
    user.points = 0;
    user.yellowcards = 0;
    user.redcards = 0;

    return user;
  }

  function findById(id) {
    return User.findById(id).exec();
  }

  function findAllByPosition(position) {
    return User.find({
      position: position
    }).exec();
  }

  function findAll() {
    return User.find({}).exec();
  }

  return {
    addPlayer: addPlayer,
    registerUser: registerUser,
    findByUsername: findByUsername,
    findById: findById,
    findAllByPosition: findAllByPosition,
    findAll: findAll
  };
};
