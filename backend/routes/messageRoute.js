const express = require("express");

const router = express.Router();

const { isAuthenticated } = require("../middleware/isAuthenticated");
const {
  sendMessage,
  getMessage,
  deleteMessage,
} = require("../controllers/messageController");

router.post("/send/:id", isAuthenticated, sendMessage);
router.get("/:id", isAuthenticated, getMessage);
router.post("/delete", deleteMessage);
module.exports = router;
