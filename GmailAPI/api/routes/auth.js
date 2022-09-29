const express = require("express");
const router = express.Router();
const {verifyToken} = require("./../services/authServices")

router.get("/:token", verifyToken);
module.exports = router;