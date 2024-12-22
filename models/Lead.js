import mongoose from "mongoose";
// import Archive from "./Archive.js";
import followUpSchema from "./FollowUp.js";
import { addDays } from "../lib/helperFuncs.js";

const leadSchema = new mongoose.Schema({
  dateCreated: {
    required: true,
    type: Date,
    default: Date.now,
    immutable: true,
  },
  notes: String,
  nextContactDate: {type: Date, default: addDays(2)},
  leadSource: String,
  bookedTrial: {type: Boolean, default: false},
  enrolled: {type: Boolean, default: false},
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
    teacher: String,
    followUp: [followUpSchema],
  },
});



export default mongoose.model("Lead", leadSchema);
