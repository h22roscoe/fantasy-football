var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

// Define the schema for our user model
var userSchema = new Schema({
  player: {
    type: Schema.Types.ObjectId,
    ref: 'Player'
  },
  team: {
    type: Schema.Types.ObjectId,
    ref: 'Team'
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
