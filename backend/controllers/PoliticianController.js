const router = require("express").Router();

const politicanService = require("../services/PoliticianService");

router.get("/politician", politicanService.getPoliticians);
router.get("/politician/:county", politicanService.getPoliticiansByCounty);

module.exports = router;
