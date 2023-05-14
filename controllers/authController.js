// controllers/authController.js

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};

const register = async (req, res) => {
  const { name, email, password, userType } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword,
      userType: userType,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      throw new Error("Password is incorrect");
    }

    const token = jwt.sign({ userId: user._id }, "secret", { expiresIn: "1h" });

    res.status(200).json({
      token,
      user: {
        name: user.name,
        email: user.email,
        _id: user._id,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateUserProfile = async (req, res) => {
  const { userId, name, oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    if (name) {
      user.name = name;
    } else {
      throw new Error("Name not valid");
    }

    if (oldPassword && newPassword) {
      const match = await bcrypt.compare(oldPassword, user.password);

      if (!match) {
        throw new Error("Old password is incorrect");
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
    }

    await user.save();

    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllUsers,
  getUserById,
  updateUserProfile,
};
