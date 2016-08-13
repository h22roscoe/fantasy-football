var mongoose = require('mongoose');

// Define the schema for our user model
var teamSchema = mongoose.Schema({
  name: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  players: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  points: Number
});

module.exports = mongoose.model('Team', teamSchema);
