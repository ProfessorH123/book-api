// import express
const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// import dotenv
const dotenv = require("dotenv");
// import cors
const cors = require("cors");
dotenv.config();
const app = express();
app.use(cors());
//BodyParser Middleware
app.use(express.json());
mongoose.set("strictQuery", false);
// import routes
const bookRoutes = require("./routes/book");
const genderRoutes = require("./routes/gender");
const sgenderRoutes = require("./routes/sgender");
const orderRoutes = require("./routes/order");
const cartRoutes = require("./routes/cart");
const authRoutes = require("./routes/auth");

// connect to MongoDB
mongoose.connect(process.env.DATABASECLOUD, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// handle connection error
mongoose.connection.on("error", (err) => {
  console.error(`MongoDB connection error: ${err}`);
});

// routes
app.use("/auth", authRoutes);
app.use("/books", bookRoutes);
app.use("/genders", genderRoutes);
app.use("/orders", orderRoutes);
app.use("/carts", cartRoutes);
app.use("/sgenders", sgenderRoutes);
// server port
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

//app.use('/books',authMiddleware.authenticate, bookRoutes);

// npm install express mongoose jsonwebtoken bcrypt body-parser cors dotenv nodemailer
// here is a change
app.get("/", (req, res) => {
  res.send("HAMED IS DA BEST");
});

module.exports = app;
