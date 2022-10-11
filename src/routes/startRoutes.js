const express = require("express");
const router = express.Router();
const { startCustomGame } = require("../controllers/startController");
const { startRankedGame } = require("../controllers/startController");

router.route("/CustomGame").post(startCustomGame);
router.route("/RankedGame").post(startRankedGame);

module.exports = router;
