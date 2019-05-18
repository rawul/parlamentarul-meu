const router = require("express").Router();

const chatService = require("../services/ChatService");

router.post("/chat/:token", chatService.sendMessage);

module.exports = router;
