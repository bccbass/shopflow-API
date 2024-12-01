import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
  dateCreated: { required: true, type: Date, default: Date.now },
  nextContactDate: Date,
  leadSource: String,
  student: {
    firstName: String,
    lastName: String,
    instrument: String,
    groupClass: String,
  },
  guardian: {
    firstName: String,
    lastName: String,
  },
  contact: { phone: String, email: String },
  followUp: [
    {
      dateCreated: { required: true, type: Date, default: Date.now },
      admin: String,
      method: { call: Boolean, text: Boolean, voicemail: Boolean },
      notes: String,
    },
  ],
  trialLesson: {
    date: Date,
    time: String,
    location: String,
    instrument: String,
    groupClass: String,
    instructor: String,
    enrolling: Boolean,
    followUp: [
      {
        dateCreated: { required: true, type: Date, default: Date.now },
        admin: String,
        method: { call: Boolean, text: Boolean, voicemail: Boolean },
        notes: String,
      },
    ],
  },
});

export default mongoose.model('Lead', LeadSchema);
