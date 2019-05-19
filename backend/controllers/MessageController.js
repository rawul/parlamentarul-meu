const router = require("express").Router();

const messageService = require("../services/MessageService");
const authenticationMiddleware = require('../middleware/AuthenticationMiddleware');

router.post("/message", messageService.sendMessage);
router.get("/chat/politician", messageService.getMessages);
router.use(authenticationMiddleware);
module.exports = router;
