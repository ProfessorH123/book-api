// controllers/bookController.js

const Book = require("../models/book");

const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRandomBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([{ $sample: { size: 4 } }]);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRandomLimitBooks = async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $match: { type: "featured" } },
      { $sample: { size: 3 } },
    ]);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getRandomLimitBooksBanner = async (req, res) => {
  try {
    const books = await Book.aggregate([
      { $match: { type: "banner" } },
      { $sample: { size: 2 } },
    ]);
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getBookById = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);
    res.status(200).json(book);
  } catch (error) {
    res.status(404).json({ message: "Book not found" });
  }
};

const createBook = async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    gender: req.body.gender,
    sgender: req.body.sgender,
    description: req.body.description,
    type: req.body.type,
    price: req.body.price,
    prev: req.body.prev,
    image: req.body.image,
  });

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateBook = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findById(id);

    if (!book) {
      throw new Error("Book not found");
    }

    book.title = req.body.title;
    book.author = req.body.author;
    book.description = req.body.description;
    book.gender = req.body.gender;
    book.sgender = req.body.sgender;
    book.type = req.body.type;
    book.price = req.body.price;
    book.prev = req.body.prev;
    book.image = req.body.image;

    const updatedBook = await book.save();

    res.status(200).json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteBook = async (req, res) => {
  const id = req.params.id;

  try {
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      throw new Error("Book not found");
    }

    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const searchBooks = async (req, res) => {
  const query = req.body.q;

  try {
    const books = await Book.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { author: { $regex: query, $options: "i" } },
        { genre: { $regex: query, $options: "i" } },
      ],
    }).then((books) => {
      res.status(200).json(books);
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks,
  getRandomLimitBooks,
  getRandomBooks,
  getRandomLimitBooksBanner,
};
