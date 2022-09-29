require("dotenv").config

const express = require("express");
const {registerUser} = require("../controllers/userController");

const router = express.Router();


router.get("/", registerUser);

module.exports = router;
