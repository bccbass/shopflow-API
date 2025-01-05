import express from "express";
import Repair from "../models/Repair.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getRepair = async (req, res, next) => {
  let repair;
  try {
    repair = await Repair.findById(req.params.id);
    if (repair == null) {
      return res.status(404).json({ message: "Cannot find repair" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.repair = repair;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  const query = req.query.sort;
  try {
    const sortObj =
      query == "due"
        ? { completed: 1, due: 1 }
        : query == "new"
        ? { dateCreated: -1 }
        : query == "old"
        ? { dateCreated: 1 }
        : null;
    // const repairs = await Repair.find();
    const repairs = await Repair.find().sort(sortObj);
    res.json(repairs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const repair = new Repair({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      instrument: req.body.instrument,
      status: req.body.status,
      jobDescription: req.body.jobDescription,
      notes: req.body.notes,
      completed: req.body.completed,
      createdBy: req.body.createdBy,
      due: req.body.due,
    });
    await repair.save();
    res.status(201).json(repair);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getRepair, (req, res) => {
    res.json(res.repair);
  })
  .patch(getRepair, async (req, res) => {
    if (req.body.firstName != null) {
      res.repair.firstName = req.body.firstName;
    }
    if (req.body.lastName != null) {
      res.repair.lastName = req.body.lastName;
    }
    if (req.body.email != null) {
      res.repair.email = req.body.email;
    }
    if (req.body.phone != null) {
      res.repair.phone = req.body.phone;
    }
    if (req.body.instrument != null) {
      res.repair.instrument = req.body.instrument;
    }
    if (req.body.status != null) {
      res.repair.status = req.body.status;
    }
    if (req.body.jobDescription != null) {
      res.repair.jobDescription = req.body.jobDescription;
    }
    if (req.body.notes != null) {
      res.repair.notes = req.body.notes;
    }
    if (req.body.due != null) {
      res.repair.due = req.body.due;
    }
    if (req.body.completed != null) {
      res.repair.completed = req.body.completed;
    }
    try {
      const updatedRepair = await res.repair.save();
      res.json(updatedRepair);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(getRepair, async (req, res) => {
    try {
      await res.repair.deleteOne();
      res.json({ message: `Deleted repair ${req.params.id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
