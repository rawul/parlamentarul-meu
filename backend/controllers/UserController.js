const router = require("express").Router();

const userService = require("../services/UserService");

router.post("/login", userService.loginUser);

module.exports = router;
