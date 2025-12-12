import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Users from "./models/Users.js";

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware - function that treat received informations

app.use(express.json()); // basically convert things to json

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Failed to database connect");
  }
};

connectDB();

// CREATE
app.post("/users", async (req, res) => {
  try {
    const newUser = await Users.create(req.body);
    res.json(newUser);
  } catch (error) {
    res.json({ error: error });
  }
});

// READ
app.get("/users", async (req, res) => {
  try {
    const allUsers = await Users.find();
    res.json(allUsers);
  } catch (error) {
    res.json({ error: error });
  }
});

// UPDATE
app.put("/users/:id", async (req, res) => {
  try {
    const udpateUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(udpateUser);
  } catch (error) {
    res.json({ error: error });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
