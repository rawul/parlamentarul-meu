const router = require("express").Router();

const politicanService = require("../services/PoliticianService");

router.post("/politician/:county", politicanService.getPoliticians);

module.exports = router;
