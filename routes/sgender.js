// routes/gender.js

const express = require("express");
const router = express.Router();
const {
  getAllsGenders,
  createsGender,
  deletesGender,
} = require("../controllers/sgenderController");
// import middlewares
const authMiddleware = require("../middlewares/auth");

router.get("/", getAllsGenders);
router.post("/", createsGender);
router.delete("/:id", deletesGender);

module.exports = router;
