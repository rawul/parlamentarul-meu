const router = require("express").Router();

const messageService = require("../services/MessageService");

router.post("/message", messageService.sendMessage);

module.exports = router;
