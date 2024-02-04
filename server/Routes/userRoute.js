const express = require("express");
const { registerUser, loginUser, findUser, getUser } = require('../Controllers/userController');

const router = express.Router();

router.get("/", getUser);
router.get("/find/:userId", findUser);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;