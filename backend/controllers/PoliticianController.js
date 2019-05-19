const router = require("express").Router();

const politicianService = require("../services/PoliticianService");

router.get("/politician", politicianService.getPoliticians);
router.get("/politician/:county", politicianService.getPoliticiansByCounty);
router.get("/politicians", politicianService.getPoliticiansByName);
router.get("/politicians/active", politicianService.getActivePoliticians);

router.get("/politicians/top10", politicianService.getTop10)
module.exports = router;
