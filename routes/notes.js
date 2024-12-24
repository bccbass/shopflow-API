import express from "express";
import Note from "../models/Note.js";

const router = express.Router();

//   Middleware to handle retrieving assets by ID from DB
const getNote = async (req, res, next) => {
  let note;
  try {
    note = await Note.findById(req.params.id);
    if (note == null) {
      return res.status(404).json({ message: "Cannot find note" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.note = note;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  const query = req.query.sort;
  try {
    const sortObj =
      req.query.sort == "due"
        ? { due: 1 }
        : query == "new"
        ? { dateCreated: -1 }
        : query == "old"
        ? { dateCreated: 1 }
        : null;
    // console.log('params', req.query)
    // const notes = await Note.find();
    const notes = await Note.find().sort(sortObj);
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Find and countDocuments examples. Use param queries to implement?
// router.get("/count", async (req, res) => {
//   try {
//     const notes = await Note.countDocuments({ createdBy: "Big Seller" });
//     res.json(notes);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });
router.post("/", async (req, res) => {
  try {
    const note = new Note({
      title: req.body.title,
      body: req.body.body,
      createdBy: req.body.createdBy,
      due: req.body.due,
    });
    await note.save();
    res.status(201).json(note);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getNote, (req, res) => {
    res.json(res.note);
  })
  .patch(getNote, async (req, res) => {
    if (req.body.title != null) {
      res.note.title = req.body.title;
    }
    if (req.body.body != null) {
      res.note.body = req.body.body;
    }
    if (req.body.due != null) {
      res.note.due = req.body.due;
    }
    try {
      const updatedNote = await res.note.save();
      res.json(updatedNote);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(getNote, async (req, res) => {
    try {
      await res.note.deleteOne();
      res.json({ message: `Deleted note ${req.params.id}` });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

export default router;
