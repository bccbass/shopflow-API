import mongoose from "mongoose";
// import Archive from "./Archive.js";
import followUpSchema from "./FollowUp.js";
import { addDays } from "../lib/helperFuncs.js";

const leadSchema = new mongoose.Schema(
  {
    dateCreated: {
      required: true,
      type: Date,
      default: Date.now,
      immutable: true,
    },
    notes: String,
    nextContactDate: { type: Date, default: addDays(2) },
    leadSource: String,
    bookedTrial: { type: Boolean, default: false },
    enrolled: { type: Boolean, default: false },
    student: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
      instrument: String,
      groupClass: String,
      age: Number,
    },
    guardian: {
      firstName: { type: String, trim: true },
      lastName: { type: String, trim: true },
    },
    contact: {
      phone: { type: String, trim: true },
      email: { type: String, lowercase: true, trim: true },
    },
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
  },
  {
    virtuals: {
      studentFullName: {
        get() {
          return `${this.student.firstName} ${this.student.lastName}`;
        },
      },
      guardianFullName: {
        get() {
          return `${this.guardian.firstName} ${this.guardian.lastName}`;
        },
      },
      overdue: {
        get() {
          return (new Date(this.nextContactDate) <= new Date(Date.now()));
        },
      },
      isMinor: {
        get() {
          return (
            this.guardian.lastName.length > 0 ||
            this.guardian.firstName.length > 0
          );
        },
      },
    },
  }
);

leadSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Lead", leadSchema);
