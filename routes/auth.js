import express from "express";
import User from "../models/User.js";
import { generateToken } from "../lib/authFuncs.js";
import jwt from "jsonwebtoken";



const router = express.Router();

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id);
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: 'None',
        secure: process.env.NODE_ENV === "production",
        maxAge: 1 * 24 * 60 * 60 * 1000, // 1 days
      })
      .json({ message: "Logged in successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});

// Verify user
router.get("/me", async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    res.json(user);
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

export default router;
