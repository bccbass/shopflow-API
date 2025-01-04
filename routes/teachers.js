import express from "express";
import Teacher from "../models/Teacher.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getTeacher = async (req, res, next) => {
  let teacher;
  try {
    teacher = await Teacher.findById(req.params.id);
    if (teacher == null) {
      return res.status(404).json({ message: "Cannot find teacher" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.teacher = teacher;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const teacher = new Teacher({
      ...req.body
    });
    await teacher.save();
    res.status(201).json(teacher);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getTeacher, (req, res) => {
    res.json(res.teacher);
  })
  .patch(getTeacher, async (req, res) => {
    if (req.body.firstName != null) {
      res.teacher.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
      res.teacher.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
      res.teacher.email = res.body.email;
    }
    if (req.body.phone != null) {
      res.teacher.phone = res.body.phone;
    }
    if (req.body.instruments != null) {
      res.teacher.instruments = res.body.instruments;
    }

    try {
      const updatedTeacher = await res.teacher.save();
      res.json(updatedTeacher);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(getTeacher, async (req, res) => {
    try {
      await res.teacher.deleteOne();
      res.json({ message: `Deleted teacher ${req.params.id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
