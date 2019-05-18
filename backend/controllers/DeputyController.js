const router = require("express").Router();

const deputyService = require("../services/DeputyService");

router.post("/deputy", deputyService.addDeputy);
router.get("/deputies", deputyService.getDeputies);
router.get("/deputy/:id", deputyService.getDeputyById);
<<<<<<< HEAD
router.get("/deputy/party/:party", deputyService.getDeputyByParty);
router.get("/deputy/messages/:mail", deputyService.getMessages);
=======
router.get("/deputy", deputyService.getDeputyByParty);
>>>>>>> bfe8c831fc59a0787049b30bdf7deda59221b87f

module.exports = router;
