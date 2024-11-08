import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import User from "./models/user.model.js";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users", (req, res) => {
  const user = req.body;

  if (!user.name || !user.email || !user.password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newUser = new User({
    name: user.name,
    email: user.email,
    password: user.password,
  });

  try {
    newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("Server started on port 3000");
});
