import express from "express";
import Note from "../models/note.js";

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
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", async (req, res) => {
  try {
    const note = new Note({
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
    // try {
    //   const notes = await Note.findById(req.params.id);
    //   res.json(notes);
    // } catch (err) {
    //   res.status(500).json({ message: err.message });
    // }
    res.json(res.note)
  })
  .patch((req, res) => {
    res.send({ success: `Update note ID ${req.params.id}` });
  })
  .delete(getNote, async (req, res) => {
    try {
        await res.note.deleteOne();
        res.send({ message: `Deleted note ${req.params.id}` });
    } catch (err) {
        res.status(500).json({message: err.message})
    }
  });


export default router;
