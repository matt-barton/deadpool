const express = require('express'),
  passport = require('passport'),
  facebook = require('fb'),
  FacebookStrategy = require('passport-facebook').Strategy,
  TwitterStrategy = require('passport-twitter'),
  User = require('./db/user'),
  app = express();


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findOne({ _id: id }).then(user => {
    done(null, user);
  });
});


passport.use(new FacebookStrategy({
  clientID: process.env.NODE_ENV === 'dev' ? process.env.FB_TEST_APP_ID : process.env.FB_APP_ID,
  clientSecret: process.env.NODE_ENV === 'dev' ? process.env.FB_TEST_APP_SECRET : process.env.FB_APP_SECRET,
  callbackURL: process.env.DEADPOOL_URL + "/auth/facebook/callback"
},
(token, refreshToken, profile, done) => {
  facebook.setAccessToken(token);
  facebook.api('/me?fields=email', function (res) {
    if (!res) return done();
    User.findOne({ facebookId: res.id }).then(user => {
      if (user) return done(null, user);
      User.create({ facebookId: res.id }).then((user) => {
        done(null, user);
      });
    });
  });
}));

passport.use(new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  (token, tokenSecret, profile, done) => {
    User.findOne({ twitterId: profile.id }).then((err, user) => {
      if (user) return done (null, user);
      User.create({ twitterId: profile.id }).then((user) => {
        done(null, user);
      });
    });
  }
));

app.get('/facebook', passport.authenticate('facebook', {
  scope: [ 'public_profile', 'email' ]
}));

app.get('/facebook/callback', (req, res, next) => {
  passport.authenticate('facebook', (err, user) => {
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/twitter',  passport.authenticate('twitter'));

app.get('/twitter/callback', (req, res, next) => {
  passport.authenticate('twitter', (err, user) => {
    req.logIn(user, function (err) {
      if (err) { return next(err); }
      return res.redirect('/');
    });
  })(req, res, next);
});

app.get('/logout', (req, res) => {
  req.logout(); 
  res.redirect('/');
});

function login (err, user) {

}

module.exports = app;