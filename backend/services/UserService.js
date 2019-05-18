const mongoose = require("mongoose");
const uuidv4 = require('uuidv4')
const User = require("../models/UserModel");
const passport = require('passport');

const UserService = {
  loginUser: async (req, res) => {
    const auth = await User.authenticate()(req.body.email, req.body.password);
    if (auth.user) {
      auth.user.token = uuidv4();
      await auth.user.save();
      res.send({ token: auth.user.token })
    } else {
      res.status(403).json({ message: 'Wrong username or password' })
    }
  }
}
module.exports = UserService;
