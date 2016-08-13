var mongoose = require('mongoose');

// Define the schema for our user model
var playerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  teams: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team'
  }],
  firstname: String,
  surname: String,
  position: {
    type: String,
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker']
  },
  xi: Number,
  goals: Number,
  assists: Number,
  cleansheets: Number,
  yellowcards: Number,
  redcards: Number,
  motms: Number,
  points: Number
});

module.exports = mongoose.model('Player', playerSchema);
