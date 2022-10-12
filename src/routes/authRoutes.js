const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../middleware/authentication");

const { register, login, logout } = require("../controllers/authController");

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(authenticateUser, logout);

module.exports = router;
