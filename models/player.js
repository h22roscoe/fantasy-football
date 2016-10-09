var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Define the schema for our user model
var playerSchema = new Schema({
  name: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  position: {
    type: String,
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker']
  },
  xi: Number,
  value: Number,
  appearances: Number,
  subs: Number,
  goals: Number,
  owngoals: Number,
  assists: Number,
  cleansheets: Number,
  yellowcards: Number,
  redcards: Number,
  motms: Number,
  points: Number
});

module.exports = mongoose.model('Player', playerSchema);
