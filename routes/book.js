// routes/book.js

const express = require("express");
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getRandomBooks,
  getRandomLimitBooks,
  getRandomLimitBooksBanner,
} = require("../controllers/bookController");
// import middlewares
const authMiddleware = require("../middlewares/auth");

router.get("/", getAllBooks);
router.get("/limit", getRandomLimitBooks);
router.get("/banner", getRandomLimitBooksBanner);
router.get("/random", getRandomBooks);
router.get("/:id", getBookById);
router.post("/", createBook);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);
router.post("/search", searchBooks);

module.exports = router;
