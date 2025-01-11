/** @format */

import express from "express";
import Archive from "../models/Archive.js";
import Lead from "../models/Lead.js";

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
		const archivedLeads = await Archive.find().sort({dateCreated: -1});
		res.json(archivedLeads);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});
// Route to find archive, send back to leads as active doc in collection and delete from archives collection
router.delete("/reactivate/:id", getArchive, async (req, res) => {
	try {
		const clonedArchive = { ...res.archive.toObject() };
		const lead = await Lead.create(clonedArchive);
		await lead.save();
		await res.archive.deleteOne();
		res.json(lead);
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
	.delete(getArchive, async (req, res) => {
		try {
			await res.archive.deleteOne();
			res.json({ message: `Deleted archive ${req.params.id}` });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	});

export default router;
