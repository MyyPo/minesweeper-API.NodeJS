const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const {
  startCustomGame,
  startRankedGame,
} = require("../controllers/startController");

router.route("/CustomGame").post(authenticateUser, startCustomGame);
router.route("/RankedGame").post(authenticateUser, startRankedGame);

module.exports = router;
