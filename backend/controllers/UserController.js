const router = require("express").Router();

const userService = require("../services/UserService");

router.post("/register", userService.registerUser);


module.exports = router;
