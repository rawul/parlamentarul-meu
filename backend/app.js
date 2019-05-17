require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const passport = require("passport");

// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false
//   })
// );

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use("/api/v1", require(__dirname + "/controllers/UserController"));
module.exports = app;
