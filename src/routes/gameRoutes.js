const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const { playGame, getGame } = require("../controllers/gameController");

router.route("/playGame").post(authenticateUser, playGame);

module.exports = router;
