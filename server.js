import express from "express";
import connectDB from "./infra/database.js";
import Users from "./infra/models/Users.js";
import { createUserController } from "./infra/services/controllers/userController.js";
import { userValidation } from "./infra/validator/userValidator.js";
import login from "./infra/services/login/userLogin.js";

const app = express();
const PORT = 3000;

app.use(express.json()); // basically convert things to json

connectDB();

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
})

// HEALTHY CHECK
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    database: mongoose.connection.readyState === 1 ? "connected" : "disconnected"
  })
})

// CREATE
app.post("/users", userValidation, createUserController);

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

app.post("/users/login", login)

// DELETE
app.delete("/users/:id", async (req, res) => {
  try {
    

  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
