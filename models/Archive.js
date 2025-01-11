import mongoose from "mongoose";
import followUpSchema from "./FollowUp.js";

const archiveSchema = new mongoose.Schema({
	dateCreated: {
		required: true,
		type: Date,
		immutable: true,
		default: Date.now
	},
	nextContactDate: Date,
	leadSource: String,
    bookedTrial: { type: Boolean, default: false },
    enrolled: { type: Boolean, default: false },
	student: {
		firstName: String,
		lastName: String,
		instrument: String,
		groupClass: String,
		age: Number,
	},
	guardian: {
		firstName: String,
		lastName: String,
	},
	contact: { phone: String, email: { type: String, lowercase: true } },
	followUp: [followUpSchema],
	trialLesson: {
		date: Date,
		time: { hour: String, min: String, twelveHr: String },
		location: String,
		instrument: String,
		groupClass: String,
		teacher: String,
		followUp: [followUpSchema],
	},
	notes: String
	
});

export default mongoose.model("Archive", archiveSchema);
