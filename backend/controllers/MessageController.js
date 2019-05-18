const router = require("express").Router();

const messageService = require("../services/MessageService");

router.post("/message", messageService.sendMessage);
router.get("/chat/politician", messageService.getMessages);

module.exports = router;
