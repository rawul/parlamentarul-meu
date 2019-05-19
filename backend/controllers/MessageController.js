const router = require("express").Router();

const messageService = require("../services/MessageService");
const authenticationMiddleware = require('../middleware/AuthenticationMiddleware');

router.post("/message", authenticationMiddleware, messageService.sendMessage);
router.get("/chat/politician", authenticationMiddleware, messageService.getMessages);
module.exports = router;
