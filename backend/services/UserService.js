const mongoose = require("mongoose");

require("../models/UserModel");

const User = mongoose.model("User");
const passport = require('passport');
require("../config/passport.js");

const UserService = {
    registerUser: async (req, res) => {
        User.register({ username: req.body.username }, req.body.password)
      .then(() => {
        passport.authenticate("local")(req, res, function() {
          res.send("registered");
        });
      })
      .catch(err => {
        console.log(err);
        res.status(400);
        res.send(err);
      });
    }
}

module.exports = UserService;
  