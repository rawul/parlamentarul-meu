const router = require("express").Router();

const chatService = require("../services/ChatService");

router.post("/chat/:token", chatService.sendUserMessage);
router.post("/chat", chatService.sendPoliticianMessage);

module.exports = router;
