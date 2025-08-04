const express = require("express");
const router = express.Router();
const { getDistributedByAgent } = require("../controllers/distributed.controller");
const verifyToken = require("../middleware/auth");

router.get("/agents", verifyToken, getDistributedByAgent);

module.exports = router;
