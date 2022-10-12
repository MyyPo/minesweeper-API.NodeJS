const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const { deleteGame } = require("../controllers/miscController");

router.route("/deleteGame").delete(authenticateUser, deleteGame);

module.exports = router;
