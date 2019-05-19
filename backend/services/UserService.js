const mongoose = require("mongoose");
const uuidv4 = require('uuidv4')
const User = require("../models/UserModel");

const politicianService = require('./PoliticianService');

const passport = require('passport');

const UserService = {
  loginUser: async (req, res) => {
    const auth = await User.authenticate()(req.body.email, req.body.password);
    if (auth.user) {
      const token = uuidv4();
      await auth.user.updateOne({ token })
      const politician = await politicianService.getPoliticianByUser(auth.user)
      res.send({ token, politician })
    } else {
      res.status(403).json({ message: 'Wrong username or password' })
    }
  }
}
module.exports = UserService;
