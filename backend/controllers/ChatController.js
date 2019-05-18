const router = require("express").Router();

const chatService = require("../services/ChatService");

router.post("/chat/:token", chatService.sendUserMessage);
router.post("/chat", chatService.sendPoliticianMessage);
router.get("/chat/:token", chatService.getChatByToken);
module.exports = router;
