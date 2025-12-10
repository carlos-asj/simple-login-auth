const userExists = await User.findOne({ email });
if (userExists) {
  return res.status(400).json({ error: "User already exists" });
}
