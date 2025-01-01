import mongoose from "mongoose";
// import Archive from "./Archive.js";
import followUpSchema from "./FollowUp.js";
import { addDays, localDate } from "../lib/helperFuncs.js";

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
          if (new Date(this.nextContactDate) < new Date("2020-01-01")) {
            return false;
          } else return new Date(this.nextContactDate) <= new Date(Date.now());
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
      trialDate: {
        get() {
          return localDate(this.trialLesson.date);
        },
      },
      contactDate: {
        get() {
          return localDate(this.nextContactDate);
        },
      },
      createdDate: {
        get() {
          return localDate(this.dateCreated);
        },
      },
      trialTime: {
        get() {
          return this.trialLesson?.time?.hour?.length == 0 ? '' : `${this.trialLesson?.time?.hour}:${this.trialLesson?.time?.min}${this?.trialLesson.time?.twelveHr}`;
        },
      },
    },
  }
);

leadSchema.set("toJSON", { getters: true, virtuals: true });

export default mongoose.model("Lead", leadSchema);
