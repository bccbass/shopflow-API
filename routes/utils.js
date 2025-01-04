/** @format */

import express from "express";
import Util from "../models/Util.js";

const router = express.Router();

// Define routes individually
router.get("/", async (req, res, next) => {
	const query = req.query.resource;
	try {
		const queryObj =
			query == "info"
				? { name: "info" }
				: query == "templates"
				? { name: 'templates' }
				: false;
		if (!queryObj) {
            res.status(500).json({ message: 'invalid query request' });
		} else {
			const resource = await Util.find(queryObj);
			res.json(resource);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
