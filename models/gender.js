const mongoose = require("mongoose");

const genderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Gender = mongoose.model("Gender", genderSchema);

module.exports = Gender;
