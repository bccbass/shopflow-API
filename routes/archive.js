import express from "express";
import Archive from "../models/Archive.js";

const router = express.Router();

// middleware to retrieve asset by id from db
const getArchive = async (req, res, next) => {
  let archive;
  try {
    archive = await Archive.findById(req.params.id);
    if (lead == null) {
      return res.status(404).json({ message: "Archived post not found" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.archive = archive;
  next();
};

// Define routes individually
router.get("/", async (req, res) => {
  try {
    const archivedLeads = await Archive.find();
    res.json(archivedLeads);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post("/", (req, res) => {
  res.send({ success: "create new archive" });
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get((req, res) => {
    res.send({ success: `archive ID ${req.params.id}` });
  })
  .delete((req, res) => {
    res.send({ success: `Delete archive ID ${req.params.id}` });
  });

export default router;
