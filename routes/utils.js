/** @format */

import express from "express";
import Util from "../models/Util.js";
import sgMail from '@sendgrid/mail';
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
			const resource = await Util.findOne(queryObj);
			res.json(resource);
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.post("/message", async (req, res) => {
	try {
		if (req.body.to && req.body.from && req.body.subject) {
           	await sgMail.send(req.body);
			 res.status(200).json({ message: 'email sent successfully' });
			
		}
		else {
			 res.status(500).json({ message: 'invalid mail request' });
		}
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

export default router;
