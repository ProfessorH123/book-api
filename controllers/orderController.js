// controllers/orderController.js

const Order = require("../models/order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getOrderById = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(404).json({ message: "Order not found" });
  }
};

// const createOrder = async (req, res) => {
//   const { customer, address, total, status, phone, products } = req.body;

//   const order = new Order({
//     customer,
//     address,
//     total,
//     status,
//     phone,
//     products,
//   });

//   try {
//     const newOrder = await order.save();
//     res.status(201).json(newOrder);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const nodemailer = require("nodemailer");

const createOrder = async (req, res) => {
  const { customer, address, total, status, phone, products } = req.body;

  const order = new Order({
    customer,
    address,
    total,
    status,
    phone,
    products,
  });

  try {
    const newOrder = await order.save();

    // Send an email to aaa@gmail.com
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "ttriki50@gmail.com",
        pass: "jvmdclwiohjdbwud",
      },
    });

    const mailOptions = {
      from: "ttriki50@gmail.com",
      to: "hamedtriki5@gmail.com",
      subject: "New Order",
      text: `A new order has been created.\nOrder ID: ${newOrder._id}.\nCustomer's Name:${newOrder.customer}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    book.status = req.body.status;

    const updatedOrder = await order.save();

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      throw new Error("Order not found");
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
};
