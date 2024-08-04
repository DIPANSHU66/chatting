const express = require("express");

const router = express.Router();

const {
  register,
  login,
  logout,
  getotherUsers,
} = require("../controllers/UserController");
const { isAuthenticated } = require("../middleware/isAuthenticated");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/", isAuthenticated, getotherUsers);
module.exports = router;
