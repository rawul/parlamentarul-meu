const router = require("express").Router();

const politicianService = require("../services/PoliticianService");

router.get("/politician", politicianService.getPoliticians);
router.get("/politician/:county", politicianService.getPoliticiansByCounty);
router.get("/politicians", politicianService.getPoliticiansByName);
router.get("/politicians/active", politicianService.getActivePoliticians);

module.exports = router;
