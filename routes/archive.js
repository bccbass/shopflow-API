import express from "express";
import Archive from "../models/Archive.js";
import Lead from "../models/lead.js";

const router = express.Router();

// middleware to retrieve asset by id from db
const getArchive = async (req, res, next) => {
  let archive;
  try {
    archive = await Archive.findById(req.params.id);
    if (archive == null) {
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
// Route to find archive, send to send back to leads as active doc in collection and from archives collection
router.delete("/reactivate/:id", getArchive, async (req, res) => {
  try {
    const clonedArchive = { ...res.archive.toObject() };
    const lead = await Lead.create(clonedArchive);
    await lead.save();
    await res.archive.deleteOne();
    res.json({ lead });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Define ID Routes using router.route() - this chains all operations for cleaner/concise code
router
  .route("/:id")
  .get(getArchive, (req, res) => {
    res.json(res.archive);
  })
  .delete((req, res) => {
    res.send({ success: `Delete archive ID ${req.params.id}` });
  });

export default router;
