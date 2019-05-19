const router = require("express").Router();
const authenticationMiddleware = require('../middleware/AuthenticationMiddleware');
const messageService = require("../services/MessageService");

router.post("/message", messageService.sendMessage);
router.get("/chat/politician", authenticationMiddleware, messageService.getMessages);
module.exports = router;
