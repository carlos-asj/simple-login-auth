import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Users from "./infra/models/Users.js";

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
    const newUser = await req.body;
    const emailData = req.body.email;
    const emailValidation = await Users.exists({ email: emailData });

    const nameData = req.body.name;
    if(!nameData) {
      return res.status(400).json({
        error: "Sem nome inserido!"
      })
    }

    if (!emailData || !emailData.includes("@")){
      return res.status(400).json({
        error: "E-mail incorreto!"
      });
    }

    if (emailValidation !== null) {
      return res.status(400).json({
        error: "E-mail já existe!"
      })
    }

    Users.create(newUser)
    res.status(201).json(newUser);

  } catch (error) {
    res.status(400).json({
      error: error.message
    })
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
    const emailData = req.body.email;

    if (!emailData || !emailData.includes("@")) {
      console.log("E-mail incorreto!");
      return res.status(400).json({
        error: "E-mail incorreto!"
      })
    }

    const udpateUser = await Users.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(201).json(udpateUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
