// controllers/genderController.js

const Gender = require("../models/gender");

const getAllGenders = async (req, res) => {
  try {
    const gender = await Gender.find();
    res.status(200).json(gender);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getGenderById = async (req, res) => {
  const id = req.params.id;

  try {
    const gender = await Gender.findById(id);
    res.status(200).json(gender);
  } catch (error) {
    res.status(404).json({ message: "gender not found" });
  }
};

const createGender = async (req, res) => {
  const existingGender = await Gender.findOne({ name: req.body.name });

  if (existingGender) {
    return res.status(409).json({ message: "Genre name already exists" });
  }

  const gender = new Gender({
    name: req.body.name,
  });

  try {
    const newGender = await gender.save();
    res.status(201).json(newGender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateGender = async (req, res) => {
  const id = req.params.id;

  try {
    const gender = await Gender.findById(id);

    if (!gender) {
      throw new Error("Gender not found");
    }

    gender.name = req.body.name;

    const updatedGender = await gender.save();

    res.status(200).json(updatedGender);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteGender = async (req, res) => {
  const id = req.params.id;

  try {
    const gender = await Gender.findByIdAndDelete(id);

    if (!gender) {
      throw new Error("Gender not found");
    }

    res.status(200).json({ message: "Gender deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllGenders,
  getGenderById,
  createGender,
  updateGender,
  deleteGender,
};
