const express = require("express");
const router = express.Router();
const { playGame } = require("../controllers/gameControllers");

router.route("/playGame").post(playGame);

module.exports = router;
