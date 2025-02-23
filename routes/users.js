import express from "express";
import User from "../models/User.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getUser = async (req, res, next) => {
  let user;
  try {
    user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: "Cannot find user" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.user = user;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  console.log(req.body)
  try {
    const user = new User({ ...req.body });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getUser, (req, res) => {
    // try {
    //   const users = await User.findById(req.params.id);
    //   res.json(users);
    // } catch (err) {
    //   res.status(500).json({ message: err.message });
    // }
    res.json(res.user);
  })
  .patch(getUser, async (req, res) => {
    if (req.body.firstName != null) {
      res.user.firstName = req.body.firstName;
    }

    if (req.body.lastName != null) {
      res.user.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
      res.user.email = req.body.email;
    }
    if (req.body.fullAccess != null) {
      res.user.fullAccess = req.body.fullAccess;
    }
    if (req.body.active != null) {
      res.user.active = req.body.active;
    }
    if (req.body.password != null) {
      res.user.password = req.body.password;
    }
    try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(getUser, async (req, res) => {
    try {
      await res.user.deleteOne();
      res.json({ message: `Deleted user ${req.params.id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  

export default router;
