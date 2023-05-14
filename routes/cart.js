// routes/cart.js

const express = require("express");
const router = express.Router();
const {
  getAllCarts,
  getCartById,
  createCart,
  deleteItemCart,
  deleteAllItemsCart,
} = require("../controllers/cartController");
// import middlewares
const authMiddleware = require("../middlewares/auth");

router.get("/", getAllCarts);
router.get("/:id", getCartById);
router.post("/", createCart);
router.delete("/:id", deleteItemCart);
router.delete("/", deleteAllItemsCart);

module.exports = router;
