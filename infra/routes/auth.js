const express = require("espress");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const user = require("../models/users");
const { error } = require("console");

//register
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // user exists?
    const userExists = await UserActivation.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    //new user
    const user = await user.create({ name, email, password });

    // new token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(201).json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find user
    const user = await user.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //valid password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
