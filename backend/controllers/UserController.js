const router = require("express").Router();

const userService = require("../services/UserService");

router.post("/login", userService.loginUser);
router.post("/active", userService.getActiveUsers);

module.exports = router;
