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
  },
  getActiveUsers: async (req, res) => {
    try {
      const users = await User.find().lean().exec();
      const activeRate = [];
      for (var i = 0; i < users.length; i++) {
        try {
          const chats = await Chat.find({ politicianMail: users[i].email }).lean().exec();
          console.log({ chats });
          activeRate += [users[i].name, chats.length];
        } catch (err) {
          res.status(400).json({ message: "Message could not be retrieved" });
        }
      }
      activeRate.sort((a,b) => {
        if(a[1] > b[1])
          return a[1] > b[1] ? -1 : 1;
      });
      res.status(400).json(activeRate.slice(0, 10));
    } catch (err) {
      res.status(400).json({ message: 'There has been an error' })
    }
  }
}
module.exports = UserService;
