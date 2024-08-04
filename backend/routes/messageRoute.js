const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middleware/isAuthenticated");
const { sendMessage, getMessage } = require("../controllers/messageController");

router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/:id", isAuthenticated, getMessage);

module.exports = router;
