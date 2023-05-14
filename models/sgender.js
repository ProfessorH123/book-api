const mongoose = require("mongoose");

const sgenderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Sgender = mongoose.model("sGender", sgenderSchema);

module.exports = Sgender;
