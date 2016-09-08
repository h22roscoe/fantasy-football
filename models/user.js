var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Define the schema for our user model
var userSchema = new Schema({
  admin: Boolean,
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  },
  name: String,
  position: {
    type: String,
    enum: ['Goalkeeper', 'Defender', 'Midfielder', 'Attacker']
  },
  xi: Number,
  appearances: Number,
  goals: Number,
  owngoals: Number,
  assists: Number,
  cleansheets: Number,
  yellowcards: Number,
  redcards: Number,
  motms: Number,
  points: Number
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
