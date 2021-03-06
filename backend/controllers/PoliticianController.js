const router = require("express").Router();
const AuthenticationMiddleware = require('../middleware/AuthenticationMiddleware');

const politicianService = require("../services/PoliticianService");

router.get("/politician", politicianService.getPoliticians);
router.get("/politician/:county", politicianService.getPoliticiansByCounty);
router.post("/politician/announcement", AuthenticationMiddleware, politicianService.updatePoliticianAnnouncement);

router.get("/politicians", politicianService.getPoliticiansByName);
router.get("/politicians/active", politicianService.getActivePoliticians);
router.get("/politicians/active/party", politicianService.getActiveParties);
router.get("/politicians/active/county", politicianService.getActiveCounties);

router.get("/politicians/top10", politicianService.getTop10);
module.exports = router;
