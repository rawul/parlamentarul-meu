const passport = require("passport");
const mongoose = require("mongoose");
require("../models/UserModel.js");

const User = mongoose.model("User");

passport.use(User.createStrategy());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});