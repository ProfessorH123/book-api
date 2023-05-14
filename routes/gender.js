// routes/gender.js

const express = require("express");
const router = express.Router();
const {
  getAllGenders,
  getGenderById,
  createGender,
  updateGender,
  deleteGender,
} = require("../controllers/genderController");
// import middlewares
const authMiddleware = require("../middlewares/auth");

router.get("/", getAllGenders);
router.get("/:id", getGenderById);
router.post("/", createGender);
router.put("/:id", updateGender);
router.delete("/:id", deleteGender);

module.exports = router;
