import mongoose from "mongoose";
import followUpSchema from "./FollowUp.js";

const archiveSchema = new mongoose.Schema({
  dateCreated: {
    required: true,
    type: Date,
    immutable: true,
  },
  nextContactDate: Date,
  leadSource: String,
  bookedTrial: Boolean,
  enrolled: Boolean,
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
    time: String,
    location: String,
    instrument: String,
    groupClass: String,
    instructor: String,
    followUp: [followUpSchema],
  },
});

export default mongoose.model("Archive", archiveSchema);
