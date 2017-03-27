var express = require('express');
var router = express.Router();
var User = require("../models/UserModel");
var passport = require('passport');

router.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged Out');
});

router.post('/register', function(req, res, next) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function(err, user) {
    if (err) {
      console.log('Error registering!', err);
      return next(err);
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      res.send(req.user);
    });
  });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  // If this function gets called, authentication was successful.
  // `req.user` contains the authenticated user.
  res.send(req.user.username)
});

//////// ########## BELOW IS WHAT WE HAD IN passport-fun LESSON ###########
// app.get('/login', function(req, res) {
//   res.sendFile(__dirname + '/public/login.html');
// });
//
// app.get('/logout', function(req, res) {
//   req.logout();
//   res.send('Logged out!');
// });
//
// // the passport.authenticate middleware invokes the verify function.
// app.post('/login', passport.authenticate('local', {
//   successRedirect: '/success',
//   failureRedirect: '/login',
//   //session: false
// }));

module.exports = router;
