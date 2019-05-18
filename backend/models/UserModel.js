const findOrCreate = require("mongoose-findorcreate");

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");


const User = new mongoose.Schema({
  username: {
    type: String
  },
  password: {
    type: String
  },
  token: {
    type: String
  },
  email: {
    type: String,
    unique: true
  }
});

User.plugin(passportLocalMongoose, { usernameField: 'email' });
User.plugin(findOrCreate);

module.exports = mongoose.model("User", User);