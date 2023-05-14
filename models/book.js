const mongoose = require("mongoose");
const Gender = require("./gender.js");
const sGender = require("./sgender.js");

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    sgender: [
      {
        type: String,
        ref: sGender.name,
      },
    ],
    gender: {
      type: String,
      ref: Gender.name,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    prev: {
      type: Number,
      required: false,
    },
    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// bookSchema.pre("save", function (next) {
//   if (!this.sgender || this.sgender.length === 0) {
//     const err = new Error("At least one sgender is required");
//     err.name = "ValidationError";
//     next(err);
//   } else {
//     next();
//   }
// });

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
