const express = require("express");
const router = express.Router();
const { startCustomGame } = require("../controllers/startController");

router.route("/CustomGame").post(startCustomGame);

module.exports = router;
