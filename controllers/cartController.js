// controllers/bookController.js

const Cart = require("../models/cart");

const getAllCarts = async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCartById = async (req, res) => {
  const id = req.params.id;

  try {
    const cart = await Cart.findById(id);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ message: "Cart not found" });
  }
};

const createCart = async (req, res) => {
  const cart = new Cart({
    title: req.body.title,
    price: req.body.price,
    quantity: req.body.quantity,
    image: req.body.image,
  });

  try {
    const newCart = await cart.save();
    res.status(201).json(newCart);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteItemCart = async (req, res) => {
  const id = req.params.id;

  try {
    const cart = await Cart.findByIdAndDelete(id);

    if (!cart) {
      throw new Error("Cart not found");
    }

    res.status(200).json({ message: "Cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteAllItemsCart = async (req, res) => {
  try {
    const cart = await Cart.deleteMany({});

    if (!cart) {
      throw new Error("Cart not found");
    }

    res
      .status(200)
      .json({ message: "All items in the cart deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllCarts,
  getCartById,
  createCart,
  deleteItemCart,
  deleteAllItemsCart,
};
