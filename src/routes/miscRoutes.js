const express = require("express");
const router = express.Router();
const { deleteGame } = require("../controllers/miscController");

router.route("/deleteGame").delete(deleteGame);

module.exports = router;
