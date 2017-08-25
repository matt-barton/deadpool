var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var pickSchema = new Schema ({
  displayName: String,
  ageAtExpiry: Number
});

var schema = new Schema({
  user:  { type: Schema.Types.ObjectId, ref: 'User' },
  picks: [ pickSchema ]
});

var UserPick = mongoose.model('UserPick', schema);

module.exports = UserPick;