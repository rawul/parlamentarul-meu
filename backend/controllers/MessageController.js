const router = require("express").Router();

const messageService = require("../services/MessageService");

<<<<<<< HEAD
router.post("/message", messageService.addMessage);
=======
router.post("/email", messageService.sendEmail);
>>>>>>> bfe8c831fc59a0787049b30bdf7deda59221b87f

module.exports = router;
