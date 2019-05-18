const router = require("express").Router();

const politicanService = require("../services/PoliticianService");

router.get("/politician/:county", politicanService.getPoliticians);

module.exports = router;
