var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var schema = new Schema({
  username:  { type: String, unique: true, sparse: true },
  createdAt: Date,
  updatedAt: Date,
  facebookId: Schema.Types.Mixed,
  twitterId: Schema.Types.Mixed
});

schema.pre('save', function (next) {
  let now = new Date();
  if (!this.createdAt) this.createdAt = now;
  this.updatedAt = now;
  next();
});

schema.statics.findOrCreateUser = function findOrCreateUser (userDoc, done) {
  var self = this;
  return self.findOne(userDoc).then(user => {
    if (user) return done(null, user);
    return self.create(userDoc).then((user) => {
      done(null, user);
    });
  });
}

var User = mongoose.model('User', schema);

module.exports = User;