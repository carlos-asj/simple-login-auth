const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const user = require("../models/users/users");

//get all users
router.get("/", authMiddleware, async (req, res) => {
  try {
    const users = await user.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//get current user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await UserActivation.findById(req.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//update user
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, email } = req.body;
    const user = await user
      .findByIdAndUpdate(req.params.id, { name, email }, { new: true })
      .select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE user
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
