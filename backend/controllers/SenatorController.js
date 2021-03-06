const router = require("express").Router();

const senatorService = require("../services/SenatorService");

router.get("/senator/:id", senatorService.getById);
router.get("/senator/party", senatorService.getByParty)
router.get("/senator", senatorService.getByDistrict)
router.get("/senators", senatorService.getAll);
router.post("/senator", senatorService.add);

module.exports = router;
