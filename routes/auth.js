const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  getAllUsers,
  getUserById,
  updateUserProfile,
} = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/updateProfile", updateUserProfile);
router.get("/user", getAllUsers);
router.get("/user/:id", getUserById);
module.exports = router;
