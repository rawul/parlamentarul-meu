require("dotenv").config();
const router = require("express").Router();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const session = require("express-session");
const passport = require("passport");

app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

router.use(require(__dirname + "/controllers/UserController"));
router.use(require(__dirname + "/controllers/DeputyController"));
router.use(require(__dirname + "/controllers/SenatorController"));
router.use(require(__dirname + "/controllers/MessageController"));

app.use('/api/v1', router);

module.exports = app;
