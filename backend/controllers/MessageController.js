const router = require("express").Router();

const messageService = require("../services/MessageService");
const authenticationMiddleware = require('../middleware/AuthenticationMiddleware');

router.use(authenticationMiddleware);
router.post("/message", messageService.sendMessage);
router.get("/chat/politician", messageService.getMessages);
module.exports = router;
