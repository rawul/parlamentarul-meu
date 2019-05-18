const router = require("express").Router();

const messageService = require("../services/MessageService");

router.post("/email", messageService.sendEmail);

module.exports = router;
