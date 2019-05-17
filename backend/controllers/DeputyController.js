const router = require("express").Router();

const deputyService = require("../services/DeputyService");

router.post("/deputy", deputyService.addDeputy);
router.get("/deputies", deputyService.getDeputies);
router.get("/deputy/:id", deputyService.getDeputyById);
router.get("/deputy/party/:party", deputyService.getDeputyByParty);

module.exports = router;
