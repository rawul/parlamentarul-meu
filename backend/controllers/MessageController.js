const router = require("express").Router();

const messageService = require("../services/MessageService");

router.post("/message", messageService.addMessage);

module.exports = router;
