var mongoose = require('mongoose');

// Define the schema for our user model
var teamSchema = mongoose.Schema({
  name: String,
  formation: {
    type: String,
    enum: ['4-4-2', '4-5-1', '4-3-3', '3-4-3', '3-5-2']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  goalkeepers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  defenders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  midfielders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  attackers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  substitutes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  }],
  points: Number
});

module.exports = mongoose.model('Team', teamSchema);
