// controllers/sgenderController.js

const Sgender = require("../models/sgender");

const getAllsGenders = async (req, res) => {
  try {
    const gender = await Sgender.find();
    res.status(200).json(gender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createsGender = async (req, res) => {
  const existingGender = await Sgender.findOne({ name: req.body.name });

  if (existingGender) {
    return res.status(409).json({ message: "Sub Genre name already exists" });
  }

  const gender = new Sgender({
    name: req.body.name,
  });

  try {
    const newGender = await gender.save();
    res.status(201).json(newGender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deletesGender = async (req, res) => {
  const id = req.params.id;

  try {
    const gender = await Sgender.findByIdAndDelete(id);

    if (!gender) {
      throw new Error("Sub Gender not found");
    }

    res.status(200).json({ message: "Sub Gender deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllsGenders,
  createsGender,
  deletesGender,
};
