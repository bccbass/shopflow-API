/** @format */

import express from "express";
import Util from "../models/Util.js";
import sgMail from '@sendgrid/mail';
import Lead from '../models/Lead.js'

sgMail.setApiKey(process.env.SENDGRID_API_KEY);


const router = express.Router();

const getLead = async (req, res, next) => {
  let lead;
  try {
    lead = await Lead.findById(req.query.userId)
    if (lead == null) {
      return res.status(404).json({ message: "Cannot find lead" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  res.lead = lead;
  next();
};

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

router.post("/message", getLead, async (req, res) => {
	try {
		if (req.body.personalizations && req.body.from && req.body.subject) {
           	await sgMail.send(req.body);
			   res.lead.correspondence = res.lead.correspondence.includes(req.query.emailId) ? res.lead.correspondence : [...res.lead.correspondence, req.query.emailId]
      		   const updated = await res.lead.save();
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
