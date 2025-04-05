require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const session = require("express-session");
const cors = require("cors");
const User = require("./models/users.model");
const connectToDB = require("./db");
const routes = require("./routes/index");
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true,
}));
app.use(cors());

// Database Connection
connectToDB();

// Routes
app.get("/", async (req, res) => {
  try {
    res.status(200).json({ Status: "Working" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ Status: "Internal Server Error" });
  }
})

app.use("/api", routes);

// app.post("/register", async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     // const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, password });
//     await newUser.save();
//     res.status(201).send("User Registered");
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Error registering user");
//   }
// });

// app.post("/login", async (req, res) => {
//   const { username, password } = req.body;
//   if (username == process.env.ADMIN_USER) {
//     if(password == process.env.ADMIN_PASS){
//       res.status(200).json("Admin User login");
//     }
//   }
//   const user = await User.findOne({ username });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     req.session.user = user;
//     res.status(200).json("Login successful");
//   } else {
//     res.status(401).send("Invalid credentials");
//   }
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy();
//   res.send("Logged out");
// });

app.listen(3000, () => console.log("Server running on port 3000"));

