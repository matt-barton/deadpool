var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  username:  String,
  facebookId: Schema.Types.Mixed,
  twitterId: Schema.Types.Mixed
});

var User = mongoose.model('User', schema);

module.exports = User;